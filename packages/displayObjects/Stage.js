import { DisplayObject } from './DisplayObject';

/**
 * @type {FStage}
 */
export function Stage(width, height) {
	let o = DisplayObject();

	/**
	 * @type {TStageOnlyProps}
	 */
	let props = {
		stage: true
	};

	let self = /** @type {TStage} */ (Object.assign(o, props));
	self.width = width;
	self.height = height;
	self.name = 'stage';

	return self;
}
