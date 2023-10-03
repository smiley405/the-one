/**
 * @param {TDimension} dimension
 * @param {HTMLDivElement} root
 * @returns {void}
 */
export function Resizer(dimension, root) {
	function resize() {
		const innerHeight = window.innerHeight;
		const innerWidth = window.innerWidth;
		const ratioWidth = innerWidth / dimension.width;
		const top = -(dimension.height - innerHeight) / 2;
		const left = -(dimension.width - innerWidth) / 2;
		root.style.transform = 'scale(' + ratioWidth + ')';
		root.style.top = top.toString() + 'px';
		root.style.left = left.toString() + 'px';
	}
	resize();
	window.onresize = resize;
}
