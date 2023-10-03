import { ASSETS } from '@packages/assets-store';

import { Sprite } from './Sprite';

/**
 * @type {FAnimatedSprite}
 */
export function AnimatedSprite(src) {
	let frameCounter = 0;
	/**
	 * @type {number[]}
	 */
	let frames = src.map((_, i) => i);
	let sprite = Sprite();
	let accumulator = 0;

	/**
	 * @type {Partial<TAnimatedSpriteOnlyProps>}
	 */
	let props = {
		fps: 8,
		loop: true,
		currentFrame: 0,
		playing: false
	};

	const self = /** @type {TAnimatedSprite} */ (Object.assign(sprite, props));

	self.setTexture = (src) => {
		self.texture = src;

		// Set the sprite to the first frame
		const imgData = ASSETS.images[src[0]];
		self._registerTexture(imgData);
	};

	self.gotoAndStop = (frameNumber, reset) => {
		const framesData = ASSETS.images[self.texture[frameNumber]];

		if (framesData) {
			self._registerTexture(framesData);
		}

		self.currentFrame = frameNumber;

		if (reset) resetAnimation();
	};

	self.play = () => {
		if (!self.playing) {
			self.playing = true;
		}
	};

	self.stop = () => {
		resetAnimation();
		self.gotoAndStop(self.currentFrame);
	};

	self.animUpdate = (dt) => {
		if (!self.playing) {
			accumulator = 0;
			return;
		}

		accumulator += dt;

		while(accumulator * self.fps >= 1) {
			advanceFrame();
			accumulator -= 1 / self.fps;
		}
	};

	const _destroy = self.destroy;

	self.destroy = () => {
		self.onAnimComplete = undefined;
		self.onAnimUpdate = undefined;
		resetAnimation();
		_destroy();
	};

	function advanceFrame() {
		self.gotoAndStop(frames[frameCounter]);

		if (self.onAnimUpdate) self.onAnimUpdate(frameCounter);

		frameCounter += 1;

		if (frameCounter >= frames.length) {
			if (self.loop) {
				frameCounter = 0;
			} else {
				if (frameCounter >= frames.length + 1 && self.onAnimComplete) {
					self.onAnimComplete();
					self.stop();
				}
			}
		}
	}

	function resetAnimation() {
		accumulator = 0;
		frameCounter = 0;
		self.playing = false;
	}

	self.setTexture(src);

	return self;
}
