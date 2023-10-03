import { AnimatedSprite } from './AnimatedSprite';
import { Group } from './Group';

/**
 * @type {FMovieClip}
 */
export function MovieClip(clips) {
	/**
	 * @type {TDisplayObject}
	 */
	let parent;

	/**
	 * @type {TAnimatedSprite}
	 */
	let currentAnim;

	/**
	 * @type {TAnimations}
	 */
	let animations = {};

	let o = Group();

	/**
	 * @type {Partial<TMovieClipOnlyProps>}
	 */
	let props = {
		addTo,
		play,
		stop
	};

	let self = /** @type {TMovieClip}*/ (Object.assign(o, props));

	const _destroy = self.destroy;

	self.destroy = () => {
		_destroy();
		animations = {};
	};

	if (clips) init();

	function init() {
		for (let name in clips) {
			const clip = clips[name];
			const anim = AnimatedSprite(clip.frames);
			animations[name] = anim;
			anim.name = name;
		}
	}

	/**
	 * @param {string} name
	 * @returns {void}
	 */
	function create(name) {
		if (currentAnim && parent) {
			currentAnim.destroy();
		}

		const clip = clips[name];
		currentAnim = animations[name];
		currentAnim.fps = clip.fps !== undefined ? clip.fps : currentAnim.fps;
		currentAnim.loop = clip.loop !== undefined ? clip.loop : currentAnim.loop;
		self.addChild(currentAnim);
		self.currentAnimName = name;
	}

	/**
	 * @type {FMoveClipPlay}
	 */
	function play(name) {
		if (currentAnim && name === currentAnim.name) {
			return;
		}
		create(name);
		currentAnim.play();
		currentAnim.onAnimUpdate = () => {
			if (self.onAnimUpdate) self.onAnimUpdate(currentAnim.currentFrame, name);
		};
		currentAnim.onAnimComplete = () => {
			if (self.onAnimComplete) self.onAnimComplete(name);
		};
	}

	/**
	 * @type {voidFunc}
	 */
	function stop() {
		if (!currentAnim) {
			return;
		}
		currentAnim.stop();
	}

	/**
	 * For movieclip, use this fn to addTo parent instead of someParent.addChil(...)
	 * Add to parent displayObject.
	 * Call this before play & stop method.
	 * @type {FAddTo}
	 */
	function addTo(_parent) {
		parent = _parent; 
		parent.addChild(o);
	}

	return self;
}
