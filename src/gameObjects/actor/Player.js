import { PLAYER_EVENTS } from '@game/Events';
import { Game } from '@game/Game';
import { hitTest } from '@packages/collisions';
import { Rectangle } from '@packages/displayObjects';
import { getAnimFrames } from '@packages/utils/misc';

import { Arrow } from '../Arrow';
import { Actor } from './Actor';

/**
 * @type {FPlayer}
 */
export function Player() {
	// const world = Game.root.world;
	// add to own world -> playerWorld
	const world = Game.root.playerGroup;
	const timer = Game.timer;

	const idle1Sheet = 'player/idle1/idle';
	const idle2Sheet = 'player/idle2/idle';
	const dieSheet = 'player/die/die';
	const runSheet = 'player/run/run';
	const gotHitSheet = 'player/got_hit/';
	const swordAttack1Sheet = 'player/sword_attack1/sword_attack';
	const swordAttack2Sheet = 'player/sword_attack2/sword_attack';
	const swordAttack3Sheet = 'player/sword_attack3/sword_attack';
	const arrowAttackSheet = 'player/arrow_attack/arrow_attack';

	const idleAnimName = 'idle1';

	const o = Actor({
		world,
		gravity: 0.4,
		body: {
			width: 5,
			height: 16,
			color: 'red'
		},
		animations: {
			'idle1': {
				frames: getAnimFrames(idle1Sheet + 1),
				fps: 4
			},
			'idle2': {
				frames: getAnimFrames(idle2Sheet + 2),
				fps: 4
			},
			'run': {
				frames: getAnimFrames(runSheet)
			},
			'swordAttack1': {
				frames: getAnimFrames(swordAttack1Sheet + 1).concat(idle2Sheet + 2),
				loop: false,
				fps: 12
			},
			'swordAttack2': {
				frames: getAnimFrames(swordAttack2Sheet + 2).concat(idle2Sheet + 2),
				loop: false,
				fps: 12
			},
			'swordAttack3': {
				frames: getAnimFrames(swordAttack3Sheet + 3).concat(idle2Sheet + 2),
				loop: false,
				fps: 12
			},
			'arrowAttack': {
				frames: getAnimFrames(arrowAttackSheet).concat(arrowAttackSheet + '_0001'),
				loop: false,
				fps: 10
			},
			'dieFall': {
				frames: getAnimFrames(dieSheet + '_0000'),
				loop: false
			},
			'dieLand': {
				frames: getAnimFrames(dieSheet + '_0001'),
				loop: false
			},
			'jump': {
				frames: getAnimFrames(runSheet + '_0001'),
				loop: false
			},
			'entryFall': {
				frames: [
					'player/sky_fall/sky_fall_1.png',
					'player/sky_fall/sky_fall_2.png',
					'player/sky_fall/sky_fall_3.png'
				],
				fps: 12,
				loop: false
			},
			'entryLand': {
				frames: [
					'player/sky_fall/sky_fall_4.png',
					'player/sky_fall/sky_fall_5.png',
					'player/sky_fall/sky_fall_6.png',
					'player/sky_fall/sky_fall_7.png',
					'player/sky_fall/sky_fall_8.png',
					'player/sky_fall/sky_fall_9.png',
				],
				fps: 12,
				loop: false
			},
			'gotHit': {
				frames: getAnimFrames(gotHitSheet),
				fps: 12,
				loop: false
			},
		// 'test': {
		// 	frames: /** @type {string[]} */([getAnimFrames('arrow_attack_0000')]),
		// 	loop: true
		// },
		}

	});
	let swordAttackType = 1;

	/**
	 * @type {Partial<TPlayerOnlyProps>}
	 */
	let props = {
		name: 'player'
	};

	let self = /** @type {TPlayer} */ (Object.assign(o, props));

	self.body.name = `${props.name}-body`;
	self.skin.name = `${props.name}-skin`;
	self.body.x = 464/2;
	self.body.y = 0;
	self.flipH = 'right'; 
	self.body.alpha = 0;
	self.skin.alpha = 0;
	self.health = 5;
	self.skin.play(idleAnimName);

	const indicator = Rectangle(2, 4, '#9f183a', '', 0, 0, 0);
	indicator.alpha = 0;
	world.addChild(indicator);

	self.attackHitArea.alpha = 0;

	Game.root.setHealth(self.health);

	const _update = self.update;
	const _kill = self.kill;
	const _receiveDamage = self.receiveDamage;
	const _destroy = self.destroy;

	/**
	 * @type {number[]}
	 */
	const timers = [];

	let isEntryFall = true;
	let isEntryLand = false;

	self.skin.onAnimUpdate = (frameNumber, name) => {
		const isArrowAttack = name.includes('arrow');

		if (isArrowAttack && frameNumber === 1 && Game.root.arrows() > 0) {
			spawnArrow();
		}

		if (name.includes('swordAttack')) {
			showAttack1HitArea(frameNumber);
		}
	};

	self.skin.onAnimComplete = (name) => {
		const isSwordAttack = name.includes('sword');
		const isArrowAttack = name.includes('arrow');
		const fall = name.includes('entryFall');
		const land = name.includes('entryLand');
		const isGotHit = name.includes('gotHit');

		if (isSwordAttack || isArrowAttack) {
			self.attacking = false;
			self.removeAttackHitArea();
		}

		if (isSwordAttack) {
			// TODO : do proper implementation or aaybe rand for moves
			updateSwordAttackType();
		}

		if (fall) {
			isEntryFall = false;
			isEntryLand = true;
			self.skin.play('entryLand');
			Game.emitter.emit(PLAYER_EVENTS.ENTRY_LANDED);
		}

		if (land && isEntryLand) {
			isEntryLand	= false;
			self.skin.play(idleAnimName);
		}

		if (isGotHit) {
			self.gotHit = false;
			killTimers();

			// blink in timley manner
			const t = timer.chain([
				{
					time: 100,
					onComplete: () => {
						self.skin.alpha = 0;
					}
				},
				{
					time: 100,
					onComplete: () => {
						self.skin.alpha = 1;
					}
				},
				{
					time: 100,
					onComplete: () => {
						self.skin.alpha = 0;
					}
				},
				{
					time: 100,
					onComplete: () => {
						self.skin.alpha = 1;
						self.disableGotHit = false;
					}
				}
			]);

			timers.push(t);
		}
	};

	self.update = () => {
		if (isEntryFall) {
			self.skin.alpha = 1;
			self.skin.play('entryFall');
		}

		_update();
		if (!self.dead && !self.gotHit) {
			if (Game.root.enemies && Game.root.enemies.length >= 3) {
				indicator.alpha = 1;
			}
			updateMovement();
			updateAttack();
			if (self.attacking) {
				swordsVsEnemies();
			}
		}
		updateIndicator();
		self.vsPlatforms(Game.root.platforms);

		updateOnDie();

	};

	self.kill = () => {
		_kill();
		Game.sound.playSFX('die');
		self.skin.play('dieFall');
		self.jump(3);
		self.vx = -self.flipHValue() * 1;
	};

	self.receiveDamage = (amount, from) => {
		if (self.attacking) {
			self.disableGotHit = false;
			self.gotHit = false;
			self.vx = 0;
			self.removeAttackHitArea();
			return;
		}
		if (self.disableGotHit) {
			return;
		}
		_receiveDamage(amount, from);

		Game.root.setHealth(o.health);
	};

	self.onReceiveDamage = (amount, from) => {
		if (!self.gotHit && self.skin.currentAnimName !== 'gotHit') {
			self.gotHit = true;
			self.disableGotHit = true;
			self.skin.play('gotHit');
			self.vx = 0;

			if (isBehindEnemy(from)) {
				if (self.isFlipH()) {
					self.flip('right');
				} 
			} else {
				if (!self.isFlipH()) {
					self.flip('left');
				}
			}

			// TODO:: error on while got hit during attack mode: fixed, but needs re-checking

			// repeal
			self.jump(3);
			self.vx = -self.flipHValue() * 0.5;

			killTimers();
		}
	};

	self.destroy = () => {
		_destroy();
		killTimers();
		indicator.destroy();
	};

	function updateOnDie() {
		// if (Game.key.isDown('ok')) {
		// 	self.receiveDamage(10);
		// }

		if (self.dead) {
			if (self.grounded) {
				self.vx = 0;
				self.skin.play('dieLand');

				const t = timer.wait({
					time: 1000,
					onComplete: ()=> {
						Game.root.setGameOver(true);
						self.destroy();
					}
				});
				timers.push(t);
			}
		}
	}

	function updateSwordAttackType() {
		if (isAttack()) {
			swordAttackType += 1;
			if (swordAttackType > 3) {
				swordAttackType = 1;
			}
		} else {
			swordAttackType = 1;
		}
	}

	function updateIndicator() {
		indicator.x = !self.isFlipH() ?
			self.body.x + indicator.halfWidth() :
			self.body.x + indicator.width;

		indicator.y = self.body.y - self.body.height;
	}

	function spawnArrow() {
		const x = !self.isFlipH() ?
			self.body.x + 3:
			self.body.x - 10;

		Arrow(x, self.body.y + 2, self.flipHValue());
		Game.root.setArrows(-1);
	}

	function updateMovement() {
		if (self.vy > 0) {
			self.falling = true;
		}

		if (isEntryFall || isEntryLand) {
			self.vx = 0;
			return;
		}

		if (!self.attacking) {
			if (isMove()) {
				if (self.grounded) {
					self.skin.play('run');
				}
				self.vx = self.flipHValue() * self.speedX;
			}

			if (isMove('right')) {
				self.flip('right');
			} else if (isMove('left')) {
				self.flip('left');
			} else {
				// add friction
				self.vx *= 0.3;
				if (self.grounded) {
					self.skin.play(idleAnimName);
				}
			}
		}

		if (isJump()) {
			if (self.grounded && !self.attacking) {
				self.jump();
				self.skin.play('jump');
			}
		}

	}

	function updateAttack() {
		if (isAttack()) {
			if (self.grounded) {
				attack();

				if (isSlash()) {
					swordAttack();
				} else {
					arrowAttack();
				}
			}
		}
	}

	function attack() {
		self.attacking = true;
		self.vx = 0;
	}

	function swordAttack() {
		Game.sound.playSFX('slash');
		self.skin.play('swordAttack'+ swordAttackType);
	}

	function arrowAttack() {
		Game.sound.playSFX('shoot');
		self.skin.play('arrowAttack');
	}

	function swordsVsEnemies() {
		if (!self.attackHitArea.parent) {
			return;
		}
		const enemies = Game.root.enemies;

		for (let i = 0; i < enemies.length; i++) {
			const e = enemies[i];

			const test = hitTest(e.body, self.attackHitArea);

			if (test.hit) {
				e.receiveDamage();
			}
		}
	}

	/**
	 * @param {number} frameNumber
	 * @returns {void}
	 */
	function showAttack1HitArea(frameNumber) {
		const y = self.attackHitArea.y = self.body.y - self.body.halfHeight() + 5;

		if (frameNumber === 1) {
			self.showAttackHitArea({
				x: self.body.x + self.attackHitArea.halfWidth() - 5,
				flipX: self.body.x - self.attackHitArea.width,
				y
			});
		}
		if (frameNumber === 2) {
			self.removeAttackHitArea();
		}
	}

	function killTimers() {
		timers.forEach(t => {
			Game.timer.killWait(t);
		});

		timers.length = 0;
	}

	/**
	 * @param {TFlipHSide} [side]
	 * @returns {boolean}
	 */
	function isMove(side) {
		if (side) {
			return Game.key.isDown(side);
		}

		return (Game.key.isDown('right') || Game.key.isDown('left'));
	}

	function isAttack() {
		return !self.attacking && (isShoot() || isSlash());
	}

	function isShoot() {
		return Game.key.isDown('shoot');
	}

	function isSlash() {
		return Game.key.isDown('slash');
	}

	function isJump() {
		return !self.jumping && Game.key.isDown('jump');
	}

	/**
	 * @param {TEnemy} enemy
	 * @returns {boolean}
	 */
	function isBehindEnemy(enemy) {
		return Boolean(self.body.x <= enemy.body.x);
	}

	return self;
}
