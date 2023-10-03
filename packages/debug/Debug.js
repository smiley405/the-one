/**
 * @type {FDebug}
 */
export function Debug() {
	const data = {};

	/**
	 * @type {FDebugAdd}
	 */
	function add(name, value) {
		data[name] = value;
	}

	window['_debug'] = data;

	return {
		add
	};
}
