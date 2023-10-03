/**
 * @callback FKeyboard
 * @param {TKeyboardOptions} inputKeys
 * @returns {TKeybaord}
 */

/**
 * @typedef {{[name: string]: TKeyState}} TKeyboardOptions
 */

/**
 * @typedef {object} TKeyState
 * @property {TGameKeyCode} code
 * @property {boolean} [isDown]
 */

/**
 * @typedef {object} TKeybaord
 * @property {FKeyIsDown} isDown
 */

/**
 * @callback FKeyIsDown 
 * @param {TGameKeyMapping} key
 * @returns {boolean}
 */

/**
 * @typedef {'k' | 'a' | 'd' | 'j' | 'h' | ' '} TGameKeyCode
 */

/**
 * @typedef {'jump' | 'left' | 'right' | 'slash' | 'shoot' | 'ok'} TGameKeyMapping
 */

