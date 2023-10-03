import { DisplayObject } from './DisplayObject';

// TODO:: refactor

/**
 * @type {FRectangle}
 */
export function Rectangle(
	width=1,
	height=1,
	fillStyle='red',
	strokeStyle='none',
	lineWidth=0,
	x=0,
	y=0
) {
	const o = DisplayObject();

	/**
	 * @type {Partial<TRectOnlyProps>}
	 */
	let props = {
		width,
		height,
		fillStyle,
		strokeStyle,
		lineWidth,
		x,
		y
	};

	let self = /** @type {TRect} */ (Object.assign(o, props));

	self.render = function (ctx) {
		// ctx.strokeStyle = props.strokeStyle;
		// ctx.lineWidth = props.lineWidth;
		ctx.fillStyle = props.fillStyle;
		ctx.beginPath();

		// Draw the rectangle around the context's center `0` point.
		ctx.rect(-self.width * self.pivotX, -self.height * self.pivotY, self.width, self.height);
		if (self.mask) {
			ctx.clip();
		} else {
			// if (self.strokeStyle && self.strokeStyle !== 'none') ctx.stroke();
			// if (self.fillStyle && self.fillStyle !== 'none') ctx.fill();
			ctx.fill();
		}
	};

	return self;
}
