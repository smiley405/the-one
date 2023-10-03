/**
 * @typedef {object} TMovieClipOnlyProps 
 * @property {string} [ currentAnimName ]
 * @property {FMoveClipPlay} play
 * @property {voidFunc} stop
 * @property {FMovieClipOnAnimComplete} onAnimComplete
 * @property {FMovieClipOnAnimUpdate} onAnimUpdate
 * @property {FAddTo} addTo
 * @property {voidFunc} destroy
*/

/**
 * @typedef {TDisplayObject & TMovieClipOnlyProps} TMovieClip
 */

/**
 * @callback FMovieClipOnAnimUpdate
 * @param {number} frameNumber
 * @param {string} name
 * @returns {void}
 */

/**
 * @callback FMovieClipOnAnimComplete
 * @param {string} name
 * @returns {void}
*/

/**
 * @callback FAddTo
 * @param {TDisplayObject} parent
 * @returns {void}
*/

/**
 * @callback FMoveClipPlay
 * @param {string} name
 * @returns {void}
*/

/**
 * @typedef {object} FClip
 * @property {string[]} frames
 * @property {number} [fps]
 * @property {boolean} [loop]
*/

/**
 * @typedef {Object.<string, FClip>} TClips
*/
 
/**
 * @callback FMovieClip
 * @param {TClips} clips
 * @returns {TMovieClip}
*/

/**
 * @typedef {Object.<string, TAnimatedSprite>} TAnimations 
*/
