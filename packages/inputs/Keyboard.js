/**
 * @type {FKeyboard}
 */
export function Keyboard(inputKeys) {
	window.addEventListener('keydown', onKeyDownHandler, false);
	window.addEventListener('keyup', onKeyUpHandler, false);

	/**
	 * @param {KeyboardEvent} e
	 * @returns {void}
	 */
	function onKeyDownHandler(e) {
		setKeyPressState(e.key, true);
		// e.preventDefault();
	}

	/**
	 * @param {KeyboardEvent} e
	 * @returns {void}
	 */
	function onKeyUpHandler(e) {
		setKeyPressState(e.key, false);
		// e.preventDefault();
	}

	/**
	 * @param {string} keyCode
	 * @param {boolean} isDown
	 * @returns {void}
	 */
	function setKeyPressState(keyCode, isDown) {
		const keys = Object.keys(inputKeys);
		keys.forEach(key => {
			if (keyCode === inputKeys[key].code) {
				inputKeys[key].isDown = isDown;
			}
		});
	}

	/**
	 * @type {FKeyIsDown}
	 */
	function isDown(key) {
		return Boolean(inputKeys[key].isDown);
	} 

	return {
		isDown
	};
}
