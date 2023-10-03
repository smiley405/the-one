/**
 * @type {FTicker}
 */
export function Ticker(props) {
	const fps = props && props.fps ? props.fps : 60;
	let startTime = performance.now();
	let accumulator = 0;
	let totalUpdatersUID = 0;
	let totalRenderersUID = 0;
	let delta = 1e3 / fps;
	let step = 1 / fps;
	let elapsed = 0;
	let focused = true;
	/**
	 * @type {TTickerUpdaters}
	 */
	let updaters = {};
	/**
	 * @type {TTickerRenderers}
	 */
	let renderers = {};

	window.addEventListener('focus', () => {
		onVisibilityChange(true);
	});
	window.addEventListener('blur', () => {
		onVisibilityChange(false);
	});

	/**
	 * @param {boolean} visible
	 * @returns {void}
	 */

	function onVisibilityChange(visible) {
		focused = visible;
		if (props && props.onVisibilityChange) props.onVisibilityChange(visible);
	}

	tick();

	function tick() {
		requestAnimationFrame(tick);

		if (!focused) {
			// it doesn't run here on changing tabs.
			// so, any event specific logics must be onVisibilityChange()
			return;
		}

		const current = performance.now();
		elapsed = current - startTime;
		startTime = current;

		if (elapsed > 1e3) {
			return;
		}

		accumulator += elapsed;

		while(accumulator >= delta) {
			update(step);
			accumulator -= delta;
		}
		render(step);
	}

	/**
	 * @type {FTickerUpdate}
	 */
	function update(dt) {
		for (let id in updaters) {
			updaters[id](dt);
		}
	}

	/**
	 * @type {FTickerRender}
	*/
	function render(dt) {
		for (let id in renderers) {
			renderers[id](dt);
		}
	}

	/**
	 * @type {FTickerAdd}
	 */
	function add(type, callback) {
		let total = type === 'update' ? totalUpdatersUID : totalRenderersUID; 

		const obj = type === 'update' ? updaters : renderers;

		total += 1;
		if (!obj[total]) {
			obj[total] = callback;
		}

		if (type === 'update') {
			totalUpdatersUID = total;
		} else {
			totalRenderersUID = total;
		}

		return total;
	}

	/**
	 * @type {FTickerRemove}
	 */
	function remove(id, type) {
		const obj = type === 'update' ? updaters : renderers;

		if (obj[id]) {
			delete obj[id];
		}
	}

	return {
		add,
		remove
	};
}
