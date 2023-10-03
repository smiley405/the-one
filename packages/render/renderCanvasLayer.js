/**
 * @param {TCanvasLayer} canvasLayer
 * @param {TStage} stage
 * @param {number} dt
 * @returns {void}
 */
export function renderCanvasLayer(canvasLayer, stage, dt) {
	const ctx = canvasLayer.ctx;
	const canvas = canvasLayer.canvas;

	ctx.clearRect(0, 0, canvas.width, canvas.height);

	stage.children.forEach(child => {
		display(child);
	});

	/**
	 * @param {TDisplayObject} dob
	 */
	function display(dob) {
		if (
			dob.visible &&
					dob.gx() < canvas.width + dob.width &&
					dob.gx() + dob.width >= -dob.width &&
					dob.gy() < canvas.height + dob.height &&
					dob.gy() + dob.height >= -dob.height
		) {
			ctx.save();
			ctx.translate(
				dob.x + dob.width * dob.pivotX,
				dob.y + dob.height * dob.pivotY
			);

			ctx.globalAlpha = dob.alpha;
			// ctx.rotate(dob.rotation); // TODO: check if necessary
			ctx.scale(dob.scaleX, dob.scaleY);

			if (dob.render) {
				dob.render(ctx);
			}
			if (dob.animUpdate) {
				dob.animUpdate(dt);
			}

			if (dob.children && dob.children.length > 0) {
				// Reset the context back to the parent dob's top left corner
				ctx.translate(
					-dob.width * dob.pivotX,
					-dob.height * dob.pivotY
				);

				dob.children.forEach(child => {
					display(child);
				});
			}

			ctx.restore();
		}
	}
}
