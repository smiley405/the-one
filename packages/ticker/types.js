/**
 * @callback FTicker
 * @param {FTickerProps} [props]
 * @returns {TTicker}
 */

/**
 * @typedef {object} TTicker
 * @property {FTickerAdd} add
 * @property {FTickerRemove} remove
 */

/**
 * @callback FTickerUpdate
 * @param {number} [dt]
 * @returns {void}
 */

/**
 * @callback FTickerAdd
 * @param {TTickerTypes} type
 * @param {FTickerUpdate} callback
 * @returns {number}
 */

/**
 * @callback FTickerRemove
 * @param {number} id
 * @param {TTickerTypes} type
 * @returns {void}
 */

/**
 * @typedef {'update' | 'render'} TTickerTypes
 */

/**
 * @typedef {object} FTickerProps
 * @property {number} [fps]
 * @property {FTickerOnVisibilityChange} [onVisibilityChange]
 */

/**
 * @callback FTickerOnVisibilityChange
 * @param {boolean} [visible]
 * @returns {void}
 */

/**
 * @typedef {{[id: string]: FTickerUpdate}} TTickerUpdaters
 */

/**
 * @typedef {{[id: string]: FTickerRender}} TTickerRenderers
 */

/**
 * @typedef {FTickerUpdate} FTickerRender
 */
