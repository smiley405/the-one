import { ASSETS } from '@packages/assets-store';

import { DisplayObject } from './DisplayObject';

/**
 * @type {FSprite}
 */
export function Sprite(src) {
	const o = DisplayObject();

	/**
	 * @type {Partial<TSpriteOnlyProps>}
	 */
	let props = {
		texture: src,
		type: 'Sprite'
	};

	let self = /** @type {TSprite} */ (Object.assign(o, props));

	self.setTexture = (src) => {
		self.tilesetFrame = ASSETS.images[src];
		self._registerTexture(self.tilesetFrame);
	};

	self._registerTexture = (imgData) => {
		self.source = imgData.source;
		self.sourceX = imgData.frame ? imgData.frame.x : imgData.x;
		self.sourceY = imgData.frame ? imgData.frame.y : imgData.y;
		self.width = imgData.frame ? imgData.frame.w : imgData.w;
		self.height = imgData.frame ? imgData.frame.h : imgData.h;
		self.sourceWidth = self.width;
		self.sourceHeight = self.height;
	};

	self.render = (ctx) => {
		ctx.drawImage(
			self.source,
			self.sourceX,
			self.sourceY,
			self.sourceWidth,
			self.sourceHeight,
			-self.width * self.pivotX,
			-self.height * self.pivotY,
			self.width,
			self.height
		);
	};

	if (src) self.setTexture(src);

	return self;
}
