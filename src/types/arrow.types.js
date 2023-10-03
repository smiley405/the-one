/**
 * @typedef {object} TArrow
 * @property {FArrowVsActor} vsActor
 * @property {FArrowVsWalls} vsWalls
 * @property {voidFunc} update
 * @property {voidFunc} destroy
*/

/**
 * @callback FArrowVsWalls
 * @param {TRect[]} walls
 * @returns {void}
*/

/**
 * @callback FArrowVsActor 
 * @param {TActor} actor
 * @returns {void}
*/

/**
 * @callback FArrow
 * @param {number} x
 * @param {number} y
 * @param {number} direction
 * @returns {TArrow}
*/
