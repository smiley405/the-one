/**
 * @typedef {object} TSpriteOnlyProps
 * @property {TSpriteTexture} texture 
 * @property {FSetSpriteTexture} setTexture
 * @property {FRegisterTexture} _registerTexture
 * @property {FRenderSprite} render
 * @property {HTMLImageElement} source
 * @property {*} tilesetFrame 
 * @property {number} sourceX
 * @property {number} sourceY
 * @property {number} sourceWidth
 * @property {number} sourceHeight
 * @property {string} [type]
 */

/**
 * @typedef {TDisplayObject & TSpriteOnlyProps} TSprite
 */

/**
 * @typedef {string} TSpriteTexture
 */

/**
 * @callback FSetSpriteTexture
 * @param {string} src
 * @returns {void}
 */

/**
 * @callback FRegisterTexture
 * @param {object} imgData
 * @returns {void}
 */

/**
 * @callback FRenderSprite
 * @param {CanvasRenderingContext2D} ctx
 * @returns {void}
 */

/**
 * @callback FSprite
 * @param {string} [src]
 * @returns {TSprite}
 */

