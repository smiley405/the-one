import { HttpRequest } from '@packages/http-request';
import { getFileNameFromPath } from '@packages/utils/misc';
import { Howl } from 'howler';

/**
 * @type {FSoundLoader}
 */
export function SoundLoader(source, onLoad) {

	HttpRequest(source, (file) => {
		if (!file.sprite) {
			return;
		}

		loadSound(file);
	});

	/**
	 * @param {*} file - audiosprite json file
	 * @returns {void}
	 */
	function loadSound(file) {
		/**
		 * @type {string[]}
		 */
		const urls = file.urls;
		const src = urls.map(url => `media/sounds/out/${getFileNameFromPath(url)}`);

		const sound = new Howl({
			src,
			sprite: file.sprite
		});

		sound.on('load', () => {
			onLoad(sound);
		});
	}
}
