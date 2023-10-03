import { ASSETS } from '@packages/assets-store';
import { HttpRequest } from '@packages/http-request';
import { getFileNameFromPath } from '@packages/utils/misc';

/**
 * @type {FTiledLoader}
 */
export function TiledLoader(sources, onLoad) {
	let loadedCount = 0;

	sources.forEach(source => {
		HttpRequest(source, (file) => {
			loadTiled(file, source);
		});
	});

	/**
	 * @param {*} file
	 * @param {string} source
	 * @returns {void}
	 */
	function loadTiled(file, source) {
		const fileName = getFileNameFromPath(source);
		const name = fileName.split('.')[0];

		ASSETS.tileds[name] = file; 

		loadedCount +=1;
		if (loadedCount >= sources.length) {
			onLoad();
		}
	}
}
