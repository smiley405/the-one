/**
 * @typedef {object} TSound
 * @property {voidFunc} playMusic
 * @property {FSoundPlaySFX} playSFX
 * @property {(play: boolean) => void} pause
*/

/**
 * @typedef {'die' | 'shoot' | 'slash'} TSoundSFX
*/

/**
 * @callback FSoundPlaySFX
 * @param {TSoundSFX} name
 * @returns {void}
*/

/**
 * @callback FSound
 * @param {Howl} sound
 * @returns {TSound}
*/
