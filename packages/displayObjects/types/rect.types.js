/**
 * @typedef {object} TRectOnlyProps
 * @property {boolean} mask
 * @property {number} x
 * @property {number} y
 * @property {number} width
 * @property {number} height
 * @property {string | CanvasGradient | CanvasPattern} strokeStyle
 * @property {string | CanvasGradient | CanvasPattern} fillStyle
 * @property {number} lineWidth
 * @property {FRenderSprite} render
 */

/**
 * @typedef {TDisplayObject & TRectOnlyProps} TRect
 */

/**
 * @callback FRectangle
 * @param {number} width
 * @param {number} height
 * @param {string | CanvasGradient | CanvasPattern} fillStyle
 * @param {string | CanvasGradient | CanvasPattern} strokeStyle
 * @param {number} lineWidth
 * @param {number} x
 * @param {number} y
 * @returns {TRect}
 */

