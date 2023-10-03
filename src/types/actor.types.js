/**
 * @typedef {object} TActor
 * @property {number} gravity
 * @property {number} health
 * @property {number} [damage]
 * @property {number} speedX  
 * @property {number} speedY  
 * @property {number} vx  
 * @property {number} vy  
 * @property {number} ax 
 * @property {number} ay 
 * @property {TFlipHSide} flipH 
 * @property {TRect} [ attackHitArea ] 
 * @property {number} jumpForce 
 * @property {boolean} [grounded]
 * @property {boolean} [falling] 
 * @property {boolean} [jumping]
 * @property {boolean} [attacking]
 * @property {boolean} [gotHit]
 * @property {boolean} [disableGotHit]
 * @property {boolean} [moving]
 * @property {boolean} [dead] 
 * @property {boolean} [destroyed] 
 * @property {TMovieClip} skin 
 * @property {TRect} body 
 * @property {FShowAttackHitArea} [ showAttackHitArea ]
 * @property {voidFunc} [ removeAttackHitArea ]
 * @property {voidFunc} updateGravity
 * @property {voidFunc} updateVelocity
 * @property {voidFunc} updateOnGround
 * @property {voidFunc} updateSkinBody
 * @property {voidFunc} update
 * @property {voidFunc} destroy
 * @property {FActorJump} jump
 * @property {voidFunc} kill
 * @property {FReceiveDamage} receiveDamage
 * @property {FReceiveDamage} [ onReceiveDamage ]
 * @property {FVsPlatforms} vsPlatforms
 * @property {(side: TFlipHSide) => void} flip
 * @property {() => boolean} isFlipH
 * @property {() => number} flipHValue
 */

/**
 * @callback FReceiveDamage
 * @param {number} [amount]
 * @param {*} [from] - from displayObject
 * @returns {void}
 */

/**
 * @callback FActorJump
 * @param {number} [force]
 * @returns {void}
 */

/**
 * @typedef {'right' | 'left'} TFlipHSide
 */

/**
 * @callback FVsPlatforms
 * @param {TRect[]} colliders
 * @returns {void}
 */

/**
 * @typedef {object} FActorProps
 * @property {number} gravity
 * @property {TClips} animations
 * @property {TActorBody} body
 * @property {TRect} [ attackHitArea ]
 * @property {TGroup} [ world ]
 */

/**
 * @typedef {object} TActorBody
 * @property {number} [ width ]
 * @property {number} [ height ]
 * @property {string | CanvasGradient | CanvasPattern} [ color ]
 */

/**
 * @typedef {object} FActorShowHitAreaProps
 * @property {number} x
 * @property {number} flipX
 * @property {number} y
 * @property {number} [ w ]
 * @property {number} [ h ]
 */

/**
 * @callback FShowAttackHitArea
 * @param {FActorShowHitAreaProps} props
 * @returns {void}
 */

/**
 * @callback FActor
 * @param {FActorProps} props
 * @returns {TActor}
 */
