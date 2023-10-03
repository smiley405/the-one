/**
 * @typedef {TTimerSelectiveReturns & TTimerUpdates} TTimer
 */

/**
 * @typedef {object} TTimerSelectiveReturns
 * @property {FTimerWait} wait
 * @property {FTimerChain} chain
 * @property {voidFunc} kill
 * @property {FKillTime} killChain
 * @property {FKillTime} killWait
*/

/**
 * @typedef {object} TTimerUpdates
 * @property {voidFunc} update
 * @property {( time: number ) => void} pause
*/

/**
 * @callback FKillTime
 * @param {number} id
 * @returns {void}
 */

/**
 * @callback FTimerWait
 * @param {TTimerWaitOptions} options
 * @returns {number}
 */

/**
 * @callback FTimerChain
 * @param {TTimerWaitOptions[]} timers
 * @returns {number}
 */

/**
 * @typedef {object} TTimerWaitOptions
 * @property {number} time - in milliseconds
 * @property {voidFunc} [onStart]
 * @property {voidFunc} onComplete
 */

/**
 * @typedef {{startTime: number} & TTimerWaitOptions} TTimeout
 */

/**
 * @typedef {{ended?: boolean, startTime: number} & TTimerWaitOptions} TChainedTimeoutValues
 */

/**
 * @typedef {{[id: number]: TChainedTimeoutValues}} TChainedTimeout
 */

/**
 * @typedef {{[id: number]: TTimeout}} TTimeouts
 */

/**
 * @typedef {{[id: number]: TChainedTimeout}} TChainedTimeouts
 */

/**
 * @callback FTimer
 * @returns {TTimer}
 */
