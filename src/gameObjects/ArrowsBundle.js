import { Game } from '@game/Game';
import { hitTest } from '@packages/collisions';
import { AnimatedSprite } from '@packages/displayObjects';
import { getAnimFrames } from '@packages/utils/misc';

/**
 * @type {FArrowsBundle}
 */
export function ArrowsBundle(x=0, y=0) {
	const world = Game.root.playerGroup;
	const src = getAnimFrames('arrows_bundle');
	const o = AnimatedSprite(src);
	o.x = x;
	o.y = y;
	o.fps = 12;
	o.loop = true;
	o.play();
	world.addChild(o);

	let defaultGravity = 0.4;
	let gravity = defaultGravity;
	let vy = 0;
	let ay = 0;
	let ax = 0;
	let vx = 0;
	let grounded = false;
	let falling = false;
	let jumping = false;
	let jumpForce = 6;

	const updateId = Game.ticker.add('update', update.bind(this));

	const _destroy = o.destroy;
	jump();

	o.destroy = () => {
		_destroy();
		Game.ticker.remove(updateId, 'update');
	};

	function update() {
		vx += ax;
		o.x += vx;

		vy += ay;
		vy += gravity;
		o.y += vy;

		if (vy > 0) {
			falling = true;
		}
		vsGround();
		vsPlayer();
	}

	function jump() {
		const upForce = jumpForce;
		vy = -upForce;
		grounded = false;
		jumping = true;
	}

	function updateOnGround() {
		gravity = defaultGravity;
		grounded = true;
		falling = false;
		jumping = false;
	}

	function vsGround() {
		const colliders = Game.root.platforms;

		for (let i = 0; i < colliders.length; i++) {
			const platform = colliders[i];
			const test = hitTest(platform, o);

			if (test.hit) {
				if (test.side === 'bottom' && vy >= 0) {
					updateOnGround();
					o.y = platform.y - o.height;
					vy = -gravity;
				} else if (test.side === 'top' && vy <= 0) {
					vy = 0;
				} else if (test.side === 'right' && vx >= 0) {
					o.x = platform.x - o.width;
					vx = 0;
				} else if (test.side === 'left' && vx <= 0) {
					o.x = platform.x + platform.width;
					vx = 0;
				}
				if (test.side !== 'bottom' && vy > 0) {
					grounded = false;
				}
			}
		}
	}

	function vsPlayer() {
		const player = Game.root.player;
		const test = hitTest(player.body, o);
		if (test.hit && player.health) {
			o.destroy();
			Game.root.setArrows(10);
		}
	}
}
