import { ASSETS } from '@packages/assets-store';

/**
 * @param {string} source
 * @param {(file: any) => void} onLoad
 * @returns {void}
 */
export function HttpRequest(source, onLoad) {
	const xhr = new XMLHttpRequest();

	xhr.open('GET', source, true);
	xhr.addEventListener('readystatechange', () => {
		if (xhr.status === 200 && xhr.readyState === 4) {
			ASSETS.resources[source] = JSON.parse(xhr.responseText);

			const file = JSON.parse(xhr.responseText);
			file.name = source;

			onLoad(file);
		}
	});
	xhr.send();
}
