/**
 * @param {voidFunc} load
 * @returns {void}
 */
export function Boot(load) {
	window.onload = () => {
		load();
		window.focus();
		document.body.addEventListener('click', function() {
			window.focus();
		}, false);
	};
}
