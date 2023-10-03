/**
 * @typedef {'top' | 'right' | 'bottom' | 'left' | 'none'} TCollisionSide
 */

/**
 * @typedef {object} TCollisionResult
 * @property {boolean} hit
 * @property {TCollisionSide} side
*/

/**
 * @callback FHitTest
 * @param {TDisplayObject} target
 * @param {TDisplayObject} source
 * @returns {TCollisionResult}
 *
 */
