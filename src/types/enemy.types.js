/**
 * @typedef {object} TEnemyOnlyProps
 * @property {string} [name]
 * @property {number} [scorePoint]
 * @property {TEnemyActions} [action]
 * @property {TEnemyActions} [prevAction]
 */

/**
 * @typedef {TActor & TEnemyOnlyProps} TEnemy
 */

/**
 * @typedef{'chase' | 'run-away' | 'stand' | 'attack' | 'none'} TEnemyActions
 */

/**
 * @typedef{'e1' | 'e2' | 'e3'} TEnemyTypes
 */

/**
 * @typedef{'attacker' | 'none'} TEnemyNature
 */

/**
 * @typedef {object} FEnemyOptions
 * @property {TEnemyTypes} [ enemyType ]
 * @property {TEnemyNature} [ enemyNature ]
 */

/**
 * @callback FEnemy
 * @param {FEnemyOptions} [ options ]
 * @returns {TEnemy}
 */
