import { Debug } from '@packages/debug';

import { Emitter } from './types/game.types';

/**
 * @type {import('./types/game.types').TGame}
 */
export const Game = (() => {
	return {
		debug: Debug(),
		emitter: new Emitter()
	};
})();
