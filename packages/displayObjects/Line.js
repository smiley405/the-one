import { DisplayObject } from './DisplayObject';

/**
 * @type {FLine}
 */
export function Line(strokeStyle='red', lineWidth=1, ax=0, ay=0, bx=0, by=0) {
	const o = DisplayObject();

	/**
	 * @type {Partial<TLineOnlyProps>}
	 */
	let props = {
		ax,
		ay,
		bx,
		by, 
		strokeStyle,
		lineWidth,
		lineJoin: 'miter'
	};

	let self = /** @type {TLine} */ (Object.assign(o, props));

	self.render = (ctx) => {
		ctx.strokeStyle = props.strokeStyle;
		ctx.lineWidth = props.lineWidth;
		ctx.lineJoin = props.lineJoin;
		ctx.beginPath();
		ctx.moveTo(props.ax, props.ay);
		ctx.lineTo(props.bx, props.by);
		ctx.stroke();
	};

	return self;
}
