import { Group, Sprite } from '@packages/displayObjects';
import { randomInt } from '@packages/utils/math';
import { getAnimFrame } from '@packages/utils/misc';

/**
 * @param {TGroup} world
 */
export function Grass(world) {
	const grassContainer = Group();
	grassContainer.name = 'grasses';

	world.addChild(grassContainer);

	create();

	function create() {
		for (let i = 0; i < 30; i++) {
			const index = randomInt(1, 2);
			const src = getAnimFrame(`grass/grass${index}`);
			const grass = Sprite(src);
			grass.x = i * 16;
			grassContainer.addChild(grass);
		}

		grassContainer.y = 65;
	}

	function update(player) {
		grassContainer.x = -player.body.x + 100;
		grassContainer.y = -player.body.y + 120;
	}

	return {
		update
	};
}
