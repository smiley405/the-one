/**
 * @callback FTPSImageLoader
 * @param {string[]} sources
 * @param {voidFunc} onLoad
 * @returns {void}
 */

/**
 * @typedef {{[name: string]: TTPSImages}} TTPSImageLoader
 */

/**
 * @typedef {TTPSImg & TTPSImgSource} TTPSImages
 */

/**
 * @typedef {object} TTPSImgSource
 * @property {HTMLImageElement} source
 */

/**
 * @typedef {object} TTPSImg
 * @property {TTPSFrame} frame
 * @property {boolean} rotated
 * @property {boolean} trimmed
 * @property {TTPSSpriteSourceSize} spriteSourceSize
 * @property {TTPSSourceSize} sourceSize
 */

/**
 * @typedef {object} TTPSFrame
 * @property {number} x
 * @property {number} y
 * @property {number} w
 * @property {number} h
 */

/**
 * @typedef {object} TTPSSpriteSourceSize
 * @property {number} x
 * @property {number} y
 * @property {number} w
 * @property {number} h
 */

/**
 * @typedef {object} TTPSSourceSize
 * @property {number} w
 * @property {number} h
 */

