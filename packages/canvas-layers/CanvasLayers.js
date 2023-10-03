import { toCSSPX } from '@packages/utils/misc';

/**
 * @type {FCanvasLayers}
 */
export function CanvasLayers() {
	/**
	 * @type {TCanvasLayer[]}
	 */
	const layers = [];

	/**
	 * @type {FCanvasLayersAdd}
	 */
	function add(id, width, height) {
		const canvas = document.createElement('canvas');
		canvas.setAttribute('width', toCSSPX(width));
		canvas.setAttribute('height', toCSSPX(height));
		canvas.setAttribute('id', id);

		const ctx = canvas.getContext('2d');
		ctx.imageSmoothingEnabled = false;

		const layer = {id, canvas, ctx};
		layers.push(layer);

		return layer;
	}

	/**
	 * @type {FCanvasLayersRemove}
	 */
	function remove(id) {
		for (let i = 0; i < layers.length; i++) {
			const layer = layers[i];
			if (layer.id === id) {
				layers.splice(i, 1);
				return;
			}
		}
	}

	/**
	 * @type {FCanvasLayersGet}
	 */
	function get(id) {
		const layer = layers.filter(val => val.id === id);
		return layer.length ? layer[0] : undefined;
	}

	return {
		add,
		remove,
		get
	};
}
