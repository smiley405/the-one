/**
 * @typedef {object} TLoader
 * @property {string[]} [ tpsJSONFiles ]
 * @property {string[]} [ tiledFiles ]
 * @property {string} [ soundSprite ]
 * @property {voidFunc} [ onLoadImages ]
 * @property {voidFunc} [ onLoadTileds ]
 * @property {FSoundOnLoad} [ onLoadSounds ]
 * @property {voidFunc} [ onLoadComplete ]
 */

/**
 * @callback FLoader
 * @param {TLoader} props
 * @returns {void}
 */
