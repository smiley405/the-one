import { ASSETS } from '@packages/assets-store';
import { HttpRequest } from '@packages/http-request';

/**
 * @type {FTPSImageLoader}
 */
export function TPSImageLoader(sources, onLoad) {
	/**
	 * @type {TTPSImageLoader}
	 */
	const images = {};
	let loadedCount = 0;

	sources.forEach(source => {
		HttpRequest(source, (file) => {
			if (!file.frames) {
				return;
			}

			loadImage(file, source);
		});
	});

	/**
	 * @param {*} json
	 * @param {string} source
	 * @returns {void}
	 */
	function loadImage(json, source) {
		const baseUrl = source.replace(/[^\/]*$/, '');
		const image = new Image();

		image.src = baseUrl + json.meta.image;
		image.onload = () => {
			Object.keys(json.frames).forEach(src => {
				images[src] = json.frames[src];
				images[src].source = image;
			});

			loadedCount +=1;
			if (loadedCount >= sources.length) {
				onLoad();
			}
		};
	}

	ASSETS.images = images;
}
