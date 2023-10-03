import { DisplayObject } from './DisplayObject';

/**
 * @type {FGroup}
 */
export function Group() {
	let newWidth = 0;
	let newHeight = 0;

	const o = DisplayObject();
	const _addChild = o.addChild;
	const _removeChild = o.removeChild;

	/**
	 * @type {Partial<TGroupOnlyProps>}
	*/
	let props = {
		calculateSize
	};

	let self = /** @type {TGroup} */ (Object.assign(o, props));

	self.addChild = (sprite) => {
		_addChild(sprite);
		calculateSize();
	};

	self.removeChild = (sprite) => {
		_removeChild(sprite);
		calculateSize();
	};

	function calculateSize() {
		if (self.children.length > 0) {
			newWidth = 0;
			newHeight = 0;

			self.children.forEach(function (child) {
				if (child.x + child.width > newWidth) {
					newWidth = child.x + child.width;
				}
				if (child.y + child.height > newHeight) {
					newHeight = child.y + child.height;
				}
			});
			self.width = newWidth;
			self.height = newHeight;
		}
	}

	return self;
}
