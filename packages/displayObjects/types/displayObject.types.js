/**
 * @typedef {object} TDisplayObject
 * @property {string} uid
 * @property {string} [name]
 * @property {number} x
 * @property {number} y
 * @property {number} width
 * @property {number} height
 * @property {number} scaleX
 * @property {number} scaleY
 * @property {number} pivotX
 * @property {number} pivotY
 * @property {number} rotation
 * @property {boolean} [destroyed]
 * @property {boolean} visible
 * @property {TDisplayObject} [parent]
 * @property {TDisplayObject[]} children
 * @property {FAddChild} addChild
 * @property {FRemoveChild} removeChild
 * @property {voidFunc} removeChildren
 * @property {FGlobalPosition} gx
 * @property {FGlobalPosition} gy
 * @property {number} alpha
 * @property {FHalfDimension} halfWidth
 * @property {FHalfDimension} halfHeight
 * @property {FCenter} centerX
 * @property {FCenter} centerY
 * @property {voidFunc} destroy
 */

/**
 * @callback FAddChild  
 * @param {TDisplayObject} sprite
 * @returns {void}
 */

/**
 * @callback FRemoveChild  
 * @param {TDisplayObject} sprite
 * @returns {void}
 */

/**
 * @callback FGlobalPosition
 * @returns {number}
 */

/**
 * @callback FAlpha
 * @param {number} [value]
 * @returns {number}
 */

/**
 * @callback FHalfDimension
 * @returns {number}
 */

/**
 * @callback FCenter
 * @returns {number}
 */

/**
 * @callback FDisplayObject
 * @returns {TDisplayObject}
 */

