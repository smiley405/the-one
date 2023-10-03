/**
 * @typedef {object} TCamera
 * @property {number} width
 * @property {number} height
 * @property {number} x
 * @property {number} y
 * @property {()=> number} halfWidth
 * @property {()=> number} halfHeight
 * @property {()=> number} centerX
 * @property {()=> number} centerY
 * @property {()=> number} centerY
 * @property {FRightInnerBoundary} rib
 * @property {FLeftInnerBoundary} lib
 * @property {FTopInnerBoundary} tib
 * @property {FBottomInnerBoundary} bib
 * @property {(displayObject: TDisplayObject) => void} centerOver
 */

/**
 * right inner Boundary
 * @callback FRightInnerBoundary
 * @returns {number}
 */

/**
 * left inner Boundary
 * @callback FLeftInnerBoundary
 * @returns {number}
 */

/**
 * top inner Boundary
 * @callback FTopInnerBoundary
 * @returns {number}
 */

/**
 * bottom inner Boundary
 * @callback FBottomInnerBoundary
 * @returns {number}
 */

/**
 * @callback FCamera
 * @param {TDisplayObject[]} worlds
 * @param {HTMLCanvasElement} canvas
 * @returns {TCamera}
 */
