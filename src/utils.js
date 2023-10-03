import { getDivElementById } from '@packages/utils/misc';

import { Game } from './Game';

/**
 * @param {string} id
 * @returns {void}
 */
export function zoom(id) {
	const div = getDivElementById(id);

	if (div.classList.contains('zoom')) {
		return;
	}

	div.classList.add('zoom');
	Game.timer.wait({
		time: 100, 
		onComplete: () => {
			div.classList.remove('zoom');
		}
	});
}

/**
 * @param {string} id
 * @returns {void}
 */
export function shakeScreen(id) {
	const type = 'v-shake';
	const div = getDivElementById(id);

	if (div.classList.contains(type)) {
		return;
	}

	div.classList.add(type);
	Game.timer.wait({
		time: 300,
		onComplete: () => {
			div.classList.remove(type);
		}
	});
}
