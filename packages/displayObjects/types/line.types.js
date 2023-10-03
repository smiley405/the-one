/**
 * @typedef {object} TLineOnlyProps
 * @property {number} ax
 * @property {number} ay
 * @property {number} bx
 * @property {number} by
 * @property {string | CanvasGradient | CanvasPattern} strokeStyle
 * @property {string | CanvasGradient | CanvasPattern} fillStyle
 * @property {number} lineWidth
 * @property {CanvasLineJoin} lineJoin
 * @property {FRenderSprite} render
 */

/**
 * @typedef {TDisplayObject & TLineOnlyProps} TLine
 */

/**
 * @callback FLine
 * @param {string | CanvasGradient | CanvasPattern} strokeStyle
 * @param {number} lineWidth
 * @param {number} ax
 * @param {number} ay
 * @param {number} bx
 * @param {number} by
 * @returns {TLine}
 */


