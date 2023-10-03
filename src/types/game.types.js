import EventEmitter from 'eventemitter3';

export const Emitter = EventEmitter;

/**
 * @typedef {object} TGame
 * @property {TDebug} [debug]
 * @property {TKeybaord} [key]
 * @property {TTimer} [timer]
 * @property {EventEmitter} [emitter]
 * @property {TCanvasLayers} [layers]
 * @property {TTicker} [ticker]
 * @property {TSound} [sound]
 * @property {TRootProps} [root]
 */

/**
 * @typedef {object} TRootProps
 * @property {(over: boolean) => void} setGameOver
 * @property {(value: number) => void} setHealth
 * @property {(value: number, replace?: boolean) => void} setArrows
 * @property {(value: number, replace?: boolean) => void} setScore
 * @property {() => boolean} gameStarted
 * @property {() => boolean} gameOver
 * @property {() => number} score
 * @property {() => number} arrows
 * @property {boolean} setGameOver
 * @property {TRect[]} walls
 * @property {TRect[]} platforms
 * @property {TPlayer} [player]
 * @property {TEnemy[]} [enemies]
 * @property {TDisplayObject} world
 * @property {boolean} paused
 * @property {number} wave
 * @property {TGroup} [ playerGroup ]
 * @property {TGroup} [ enemiesGroup ]
 */

