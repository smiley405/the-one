/**
 * @type {FDisplayObject}
 */
export function DisplayObject() {
	let _alpha = 1;

	/**
	 * @type {TDisplayObject}
	 */
	let o = {
		x: 0,
		y: 0,
		uid: uid(),
		width: 0,
		height: 0,
		scaleX: 1,
		scaleY: 1,
		pivotX: 0.5,
		pivotY: 0.5,
		rotation: 0,
		visible: true,
		children: [],
		addChild: (sprite) => {
			if (sprite.parent)
				sprite.parent.removeChild(sprite);

			sprite.parent = o; 
			o.children.push(sprite);
		},
		removeChild: (sprite) => {
			if (sprite.parent.uid === o.uid) {
				const index = o.children.findIndex(v => v.uid === sprite.uid); 
				o.children.splice(index, 1);
				sprite.parent = undefined;
			}
		},
		removeChildren: () => {
			removeChildren();
		},
		gx: () => {
			return globalPos('x', 'gx');
		},
		gy: () => {
			return globalPos('y', 'gy');
		},
		alpha: _alpha,
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
		destroy: () => {
			if (o.children.length) {
				removeChildren(true);
			}

			if (o.parent) {
				o.parent.removeChild(o);
				o.destroyed = true;
			}
		}
	};

	Object.assign(o, {
		alpha: {
			get: () => {
				return o.parent ? o.parent.alpha * _alpha : _alpha;
			},
			/**
			 * @param {number} value
			 */
			set: (value) => {
				_alpha = value;
			}
		}, 
	});

	/**
	 * @param {boolean} [isDestroy]
	 */
	function removeChildren(isDestroy) {
		o.children.forEach(child => {
			if (isDestroy) {
				child.destroy();
			} else {
				if (child.parent.uid === o.uid) {
					child.parent = undefined;
				}
			}
		});
		o.children.length = 0;
	}

	function uid() {
		return Math.floor(Math.random() * Date.now()).toString(16);
	}

	/**
	 * @param {'x' | 'y'} pos
	 * @param {'gx' | 'gy'} gpos
	 * @returns {number}
	 */
	function globalPos(pos, gpos) {
		return o.parent ?
			o[pos] + o.parent[gpos]() :
			o[pos];
	}

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
