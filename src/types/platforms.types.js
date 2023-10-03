/**
 * @typedef {object} TPlatform
 * @property {TRect[]} colliders
 * @property {TRect[]} walls
 * @property {voidFunc} resetWallsPos
 * @property {FPlatformMoveWalls} moveWalls
*/

/**
 * @callback FPlatformMoveWalls
 * @param {number} [ w1Dir ] - wall 1 direction
 * @param {number} [ w2Dir ] - wall 2 direction
*/

/**
 * @callback FPlatform
 * @param {TGroup} world
 * @returns {TPlatform}
*/
