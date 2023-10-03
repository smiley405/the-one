/**
 * @typedef {object} TAnimatedSpriteOnlyProps
 * @property {boolean} loop
 * @property {boolean} playing
 * @property {number} fps
 * @property {number} currentFrame
 * @property {voidFunc} [onAnimComplete]
 * @property {FOnAnimUpdate} [onAnimUpdate]
 * @property {FTickerUpdate} animUpdate
 * @property {FSetAnimatedTexture} setTexture
 * @property {FGotoAndStop} gotoAndStop
 * @property {voidFunc} play
 * @property {voidFunc} stop
 */

/**
 * @typedef {TSprite & TAnimatedSpriteOnlyProps} TAnimatedSprite
 */

/**
 * @callback FSetAnimatedTexture
 * @param {string[]} src
 * @returns {void}
 */

/**
 * @callback FOnAnimUpdate
 * @param {number} frameNumber
 * @returns {void}
 */

/**
 * @callback FGotoAndStop
 * @param {number} frameNumber
 * @param {boolean} [reset]
 * @returns {void}
 */

/**
 * @callback FAnimatedSprite
 * @param {string[]} src
 * @returns {TAnimatedSprite}
 */

