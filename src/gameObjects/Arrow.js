import { Game } from '@game/Game';
import { hitTest } from '@packages/collisions';
import { Sprite } from '@packages/displayObjects';
import { getAnimFrames } from '@packages/utils/misc';

/**
 * @type {FArrow}
 */
export function Arrow(x, y, direction) {
	const world = Game.root.playerGroup;
	const src = getAnimFrames('arrow.')[0];
	const o = Sprite(src);
	o.x = x;
	o.y = y;
	world.addChild(o);

	let speedX = 4;
	let vx = speedX;
	let ax = 0;

	Game.debug.add('arrow', o);

	const updateId = Game.ticker.add('update', update.bind(this));

	function update() {
		vx += ax;
		o.x += vx * direction;

		vsWalls();
		vsEnemies();
	}

	function vsWalls() {
		const walls = Game.root.walls;

		for (let i = 0; i < walls.length; i++) {
			const wall = walls[i];
			const test = hitTest(wall, o);

			if (test.hit) {
				destroy();
			}
		}
	}

	function vsEnemies() {
		const enemies = Game.root.enemies;

		for (let i = 0; i < enemies.length; i++) {
			const e = enemies[i];
			const test = hitTest(e.body, o);

			if (test.hit && e.health) {
				destroy();
				e.receiveDamage();
			}
		}
	}

	/**
	 * @type {FArrowVsActor}
	 */
	function vsActor(actor) {
		const test = hitTest(actor.body, o);
		if (test.hit) {
			destroy();
		}
	}

	function destroy() {
		o.destroy();
		Game.ticker.remove(updateId, 'update');
	}

	return {
		vsWalls,
		vsActor,
		update,
		destroy
	};
}
