import { Game } from '@game/Game';
import { hitTest } from '@packages/collisions';
import { MovieClip, Rectangle } from '@packages/displayObjects';

/**
 * @type {FActor}
 */
export function Actor(props) {
	const world = props.world || Game.root.world;

	const skin = MovieClip(props.animations);
	const body = Rectangle(
		props.body.width || 5,
		props.body.height || 16,
		props.body.color || 'red',
		'none',
		0,
		0,
		0
	);

	skin.addTo(world);
	world.addChild(body);

	/**
	 * @type {Partial<TActor>}
	 */
	const o = {
		gravity: props.gravity || 0.4,
		health: 10,
		damage: 1,
		speedX: 2,
		speedY: 1,
		vy: 0,
		ax: 0,
		ay: 0,
		jumpForce: 6
	};

	o.skin = skin;
	o.body = body;
	o.vx = o.speedX;
	o.update = update;
	o.updateSkinBody = updateSkinToBody;
	o.updateGravity = updateGravity;
	o.updateVelocity = updateVelocity;
	o.updateOnGround = updateOnGround;
	o.vsPlatforms = vsPlatforms;
	o.flip = flip;
	o.isFlipH = isFlipH;
	o.flipHValue = flipHValue;
	o.jump = jump;
	o.receiveDamage = receiveDamage;
	o.kill = kill;
	o.destroy = destroy;
	o.showAttackHitArea = showAttackHitArea;
	o.removeAttackHitArea = removeAttackHitArea;

	o.attackHitArea = props.attackHitArea || Rectangle(16, 16, 'red', '', 0, 0, 0);

	function update() {
		o.updateSkinBody();
		o.updateGravity();
		o.updateVelocity();
	}

	function updateGravity() {
		o.vy += o.ay;
		o.vy += o.gravity;
		body.y += o.vy;
	}

	function updateVelocity() {
		o.vx += o.ax;
		body.x += o.vx;
	}

	function updateOnGround() {
		o.gravity = props.gravity;
		o.grounded = true;
		o.falling = false;
		o.jumping = false;
	}

	function updateSkinToBody() {
		if (skin) {
			skin.x = body.x - skin.halfWidth() + body.halfWidth();
			skin.y = body.y - body.height;
		}
	}

	/**
	 * @type {FActorJump}
	 */
	function jump(force) {
		const upForce = force || o.jumpForce;
		o.vy = -upForce;
		o.grounded = false;
		o.jumping = true;
	}

	/**
	 * @type {FReceiveDamage}
	 */
	function receiveDamage(amount, from) {
		amount = amount || o.damage;

		if (o.dead) {
			return;
		}

		if (o.onReceiveDamage) o.onReceiveDamage(amount, from);

		o.health -= amount;
		if (o.health <= 0) {
			o.health = 0;
			o.kill();
		}
	}

	function kill() {
		o.dead = true;
	}

	function destroy() {
		o.skin.destroy();
		o.body.destroy();
		o.attackHitArea.destroy();
		o.health = 0;
		o.destroyed = true;
		kill();
	}

	/**
	 * @type {FVsPlatforms}
	 */
	function vsPlatforms(colliders) {
		for (let i = 0; i < colliders.length; i++) {
			const platform = colliders[i];
			const test = hitTest(platform, body);

			if (test.hit) {
				if (test.side === 'bottom' && this.vy >= 0) {
					o.updateOnGround();
					body.y = platform.y - body.height;
					o.vy = -o.gravity;
				} else if (test.side === 'top' && o.vy <= 0) {
					o.vy = 0;
				} else if (test.side === 'right' && o.vx >= 0) {
					o.body.x = platform.x - o.body.width;
					o.vx = 0;
				} else if (test.side === 'left' && o.vx <= 0) {
					o.body.x = platform.x + platform.width;
					o.vx = 0;
				}
				if (test.side !== 'bottom' && o.vy > 0) {
					o.grounded = false;
				}
			}
		}
	}

	/**
	 * @type {FShowAttackHitArea}
	 */
	function showAttackHitArea(p) {
		if (o.attackHitArea.parent) {
			return;
		}

		o.attackHitArea.width = p.w || o.attackHitArea.width; 
		o.attackHitArea.height = p.h || o.attackHitArea.height; 

		world.addChild(o.attackHitArea);
		o.attackHitArea.x = !o.isFlipH() ? p.x : p.flipX;

		o.attackHitArea.y = p.y;
	}

	function removeAttackHitArea() {
		if (o.attackHitArea.parent) {
			world.removeChild(o.attackHitArea);
			o.attackHitArea.width = 16;
			o.attackHitArea.width = 16;
		}
	}

	/**
	 * @returns {boolean}
	 */
	function isFlipH() {
		return o.flipH === 'left'; 
	}

	/**
	 * @param {TFlipHSide} side
	 * @returns {void}
	 */
	function flip(side) {
		o.flipH = side;

		if (side === 'right') {
			if (skin.scaleX < 0) {
				skin.scaleX *= -1;
			}
		} else {
			if (skin.scaleX > 0) {
				skin.scaleX *= -1;
			}
		}
	}

	/**
	 * @returns {number}
	 */
	function flipHValue() {
		return o.flipH === 'right' ? 1 : -1;
	}

	return /** @type {TActor} */(o);
}
