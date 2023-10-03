/**
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
export function randomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Clamp a number between two values, preventing it from going below or above the minimum and maximum values.
 * @param {number} min - Min value.
 * @param {number} max - Max value.
 * @param {number} value - Value to clamp.
 * @returns {number} Value clamped between min and max.
 */
export function clamp(min, max, value) {
	return Math.min(Math.max(min, value), max);
}

/**
 * Convert radians to degrees.
 * @function radToDeg
 * @param {number} rad - Radians to convert.
 * @returns {number} The value in degrees.
 */
export function radToDeg(rad) {
	return (rad * 180) / Math.PI;
}

/**
 * Convert degrees to radians.
 * @function degToRad
 * @param {number} deg - Degrees to convert.
 * @returns {number} The value in radians.
 */
export function degToRad(deg) {
	return (deg * Math.PI) / 180;
}

/**
 * @function
 * @template T
 * @param {T[]} array
 * @returns {T}
 */
export function getArrayRandomValue(array) {
	return array[ Math.floor(Math.random() * array.length) ];
}
