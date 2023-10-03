import { Group, Sprite } from '@packages/displayObjects';
import { randomInt } from '@packages/utils/math';
import { getAnimFrame } from '@packages/utils/misc';

/**
 * @callback TBgUpdate
 * @param {TPlayer} player
 * @returns {void}
 */

/**
 * @param {TGroup[]} worlds
 * @returns {{update: TBgUpdate}}
 */
export function Background(worlds) {
	const bg2Container = Group();
	const bg1Container = Group();
	bg1Container.name = 'fg';
	bg2Container.name = 'bg';

	worlds[0].addChild(bg2Container);
	worlds[1].addChild(bg1Container);

	createTrees('bg', 50, 3, 20, bg2Container);
	// createTrees('fg', 50, 2, 40, bg1Container);

	/**
	 * @param {'fg' | 'bg'} type
	 * @param {number} total
	 * @param {number} rand
	 * @param {number} xOffset
	 * @param {TDisplayObject} container
	 * @returns {void}
	 */
	function createTrees(type, total, rand, xOffset, container) {
		for (let i = 0; i < total; i++) {
			const index = randomInt(1, rand);
			const src = getAnimFrame(`tree/tree${index}_${type}`);
			const tree = Sprite(src);
			tree.x = i * xOffset;
			container.addChild(tree);
		}
	}

	/**
	 * @param {TDisplayObject} displayObject
	 * @param {number} distance
	 * @param {number} x
	 * @param {number} y
	 * @returns {void}
	 */
	function updatePosition(displayObject, distance, x, y ) {
		displayObject.x = x / distance - 50;
		// displayObject.y = y + 52;
	}

	/**
	 * @type {TBgUpdate}
	 */
	function update(player) {
		updatePosition(bg1Container, 4, -player.body.x, -player.body.y);
		updatePosition(bg2Container, 8, -player.body.x, -player.body.y);
	}

	return {
		update
	};
}
