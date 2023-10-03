/**
 * @type {FCamera}
 */
export function Camera(worlds, canvas) {
	let x = 0;
	let y = 0;

	/**
	 * @type {TCamera}
	*/
	const o = {
		width: canvas.width,
		height: canvas.height,
		// When you change the camera's position,
		// they acutally reposition the world
		get x() {
			return x;
		},
		set x(value) {
			x = value;
			worlds.forEach(world => {
				world.x = -x;
			});
		},
		get y() {
			return y;
		},
		set y(value) {
			y = value;
			worlds.forEach(world => {
				world.y = -y;
			});
		},
		halfWidth: () => {
			return halfDimension('width');
		},
		halfHeight: () => {
			return halfDimension('height');
		},
		centerX: () => {
			return center('x', 'halfWidth');
		},
		centerY: () => {
			return center('y', 'halfHeight');
		},
		rib: () => {
			return o.centerX() + o.halfWidth()/2;
		},
		lib: () => {
			return o.centerX() - o.halfWidth()/2;
		},
		tib: () => {
			return o.centerY() - o.halfHeight()/2;
		},
		bib: () => {
			return o.centerY() + o.halfHeight()/2;
		},
		centerOver: (displayObject) => {
			// Center the camera over a displayObject
			o.x = (displayObject.x + displayObject.halfWidth()) - (o.width / 2);
			o.y = (displayObject.y + displayObject.halfHeight()) - (o.height / 2);
		}
	};

	/**
	 * @param {'width' | 'height'} type
	 * @returns {number}
	 */
	function halfDimension(type) {
		return o[type] / 2;
	}

	/**
	 * @param {'x' | 'y'} pos
	 * @param {'halfWidth' | 'halfHeight'} halfDimension
	 * @returns {number}
	 */
	function center(pos, halfDimension) {
		return o[pos] + o[halfDimension]();
	}

	return o;
}
