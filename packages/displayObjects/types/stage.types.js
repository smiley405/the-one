/**
 * @typedef {object} TStageOnlyProps
 * @property {boolean} stage
*/

/**
 * @typedef {TDisplayObject & TStageOnlyProps} TStage
*/

/**
 * @callback FStage
 * @param {number} width
 * @param {number} height
 * @returns {TStage}
*/
