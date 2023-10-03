/**
 * avoid using this function on speed collision -like super fast moving objects
 * @type {FHitTest}
 */
export function hitTest(target, source) {
	const r1 = target;
	const r2 = source;
	const dx = r1.x + r1.halfWidth() - (r2.x + r2.halfWidth());
	const dy = r1.y + r1.halfHeight() - (r2.y + r2.halfHeight());
	const dwidth = (r1.width + r2.width) / 2;
	const dheight = (r1.height + r2.height) / 2;
	const crossWidth = dwidth * dy;
	const crossHeight = dheight * dx;
	/**
	 * @type {TCollisionResult}
	*/
	const collision = {
		hit: false,
		side: 'none',
	};

	if (Math.abs(dx) <= dwidth && Math.abs(dy) <= dheight) {
		if (crossWidth > crossHeight) {
			collision.side = crossWidth > -crossHeight ? 'bottom' : 'left';
		} else {
			collision.side = crossWidth > -crossHeight ? 'right' : 'top';
		}
	}

	collision.hit = Boolean(
		r1.x < r2.x + r2.width &&
        r1.x + r1.width > r2.x &&
        r1.y < r2.y + r2.height &&
        r1.y + r1.height > r2.y
	);

	return collision;
}
