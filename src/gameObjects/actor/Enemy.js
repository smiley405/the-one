import { Game } from '@game/Game';
import { hitTest } from '@packages/collisions';
import { getArrayRandomValue } from '@packages/utils/math';
import { distance, followConstant, getAnimFrames } from '@packages/utils/misc';

import { ArrowsBundle } from '../ArrowsBundle';
import { Actor } from './Actor';

export const ENEMY_ACTIONS = /** @type {TEnemyActions[]}*/(['chase', 'run-away', 'stand', 'attack', 'none']);

/**
 * @type {FEnemy}
 */
export function Enemy(options) {
	// add to own group
	const world = Game.root.enemiesGroup;
	const timer = Game.timer;
	const enemyNature = options ? options.enemyNature || 'none' : 'none';
	const enemyType = options ? options.enemyType || 'e1' : 'e1';

	const o = Actor({
		world,
		gravity: 0.4,
		body: {
			width: 5,
			height: 16,
			color: 'red'
		},
		animations: {
			'idle': {
				frames: getAnimFrames(`${enemyType}/idle/`),
				fps: 12
			},
			'run': {
				frames: getAnimFrames(`${enemyType}/run`),
				fps: 12
			},
			'attack': {
				frames: getAnimFrames(`${enemyType}/attack`),
				loop: false,
				fps: 12
			},
			'dieFall': {
				frames: [
					`${enemyType}/die/die1.png`
				],
				loop: false
			},
			'dieLand': {
				frames: [
					`${enemyType}/die/die2.png`
				],
				loop: false
			},
			'jump': {
				frames: [
					`${enemyType}/run/run1.png`
				],
				loop: false
			},
			'gotHit': {
				frames: getAnimFrames(`${enemyType}/got_hit/`),
				fps: 12,
				loop: false
			},
		// 'test': {
		// 	frames: /** @type {string[]} */([getAnimSheet('arrow_attack_0000')]),
		// 	loop: true
		// },
		}
	});

	/**
	 * @type {Partial<TEnemyOnlyProps>}
	 */
	let props = {
		name: 'enemy',
		action: 'chase'
	};

	let self = /** @type {TEnemy} */ (Object.assign(o, props));

	self.body.name = `${props.name}-body`;
	self.skin.name = `${props.name}-skin`;
	self.body.x = 10;
	self.body.y = 0;
	self.flipH = 'right'; 
	self.body.alpha = 0;
	self.skin.alpha = 1;
	self.skin.play('idle');
	self.speedX = 1;
	self.scorePoint = 1;
	self.health = 3;

	self.attackHitArea.alpha = 0;

	const _update = self.update;
	const _kill = self.kill;
	const _receiveDamage = self.receiveDamage;
	const _destroy = self.destroy;

	/**
	 * @type {number[]}
	 */
	const timers = [];

	self.skin.onAnimUpdate = (frameNumber, name) => {
		if (name === 'attack') {
			if (enemyType === 'e1') {
				showEenemy1AttackHitArea(frameNumber);
			}
			if (enemyType === 'e2') {
				showEenemy2AttackHitArea(frameNumber);
			}
			if (enemyType === 'e3') {
				showEenemy3AttackHitArea(frameNumber);
			}
		}
	};

	self.skin.onAnimComplete = (name) => {
		const isAttack = name.includes('attack');
		const isGotHit = name.includes('gotHit');

		if (isAttack) {
			self.attacking = false;
			self.removeAttackHitArea();
			resetAction();
			autoDetectActions('stand');
		}

		if (isGotHit) {
			self.gotHit = false;
			resetAction();
			autoDetectActions('stand');
		}
	};

	self.update = () => {
		_update();
		if (!self.dead) {
			if (isDetectActions()) {
				autoDetectActions();
			} else {
				updateActions();
			}
			updateMovement();
		}
		vsWalls();
		vsAttackPlayer();
		self.vsPlatforms(Game.root.platforms);
		updateOnDie();
	};

	self.kill = () => {
		if (!self.dead) {
			const spawnArrows = getArrayRandomValue([0, 1, 0, 0, 1, 0]);
			if (spawnArrows) {
				ArrowsBundle(self.body.x, self.body.y);
			}
			Game.root.setScore(self.scorePoint);
		}

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
			resetAction();
			return;
		}
		if (self.gotHit) {
			return;
		}
		_receiveDamage(amount, from);
	};

	self.onReceiveDamage = () => {
		if (!self.gotHit && self.skin.currentAnimName !== 'gotHit') {
			self.gotHit = true;
			self.skin.play('gotHit');
			self.vx = 0;

			if (isBehindPlayer()) {
				if (self.isFlipH()) {
					self.flip('right');
				} 
			} else {
				if (!self.isFlipH()) {
					self.flip('left');
				}
			}

			// repeal
			self.jump(3);
			self.vx = -self.flipHValue() * 0.5;

			killTimers();

			// console.log('enemy-health', o.health);
		}
	};

	self.updateSkinBody = () => {
		const skin = self.skin;
		const body = self.body;

		if (skin) {
			skin.x = body.x - skin.halfWidth() + body.halfWidth();
			skin.y = body.y - skin.height + body.height;
		}
	};

	self.destroy = () => {
		_destroy();
		killTimers();
	};

	function updateOnDie() {
		if (self.dead) {
			if (self.grounded) {
				self.vx = 0;
				self.skin.play('dieLand');

				const t = timer.wait({
					time: 1000,
					onComplete: ()=> {
						self.destroy();
					}
				});

				timers.push(t);
			}
		}
	}

	/**
	 * @param {number} frameNumber
	 * @returns {void}
	 */
	function showEenemy1AttackHitArea(frameNumber) {
		const y = self.attackHitArea.y = self.body.y - self.body.halfHeight() + 5;

		if (frameNumber === 1) {
			self.showAttackHitArea({
				x: self.body.x + self.attackHitArea.halfWidth() - 5,
				flipX: self.body.x - self.attackHitArea.width,
				y
			});
		}
		if (frameNumber === 3) {
			self.removeAttackHitArea();
		}
		if (frameNumber === 6) {
			self.showAttackHitArea({
				x: self.body.x + self.attackHitArea.halfWidth() - 5,
				flipX: self.body.x - self.attackHitArea.width,
				y
			});
		}
		if (frameNumber === 7) {
			self.removeAttackHitArea();
		}
	}

	/**
	 * @param {number} frameNumber
	 * @returns {void}
	 */
	function showEenemy2AttackHitArea(frameNumber) {
		const y = self.attackHitArea.y = self.body.y - self.body.halfHeight() + 5;

		if (frameNumber === 2) {
			self.showAttackHitArea({
				x: self.body.x + self.attackHitArea.halfWidth(),
				flipX: self.body.x - self.attackHitArea.width - 5,
				y,
			});
		}
		if (frameNumber === 4) {
			self.removeAttackHitArea();
		}
		if (frameNumber === 6) {
			self.showAttackHitArea({
				x: self.body.x + self.attackHitArea.halfWidth(),
				flipX: self.body.x - self.attackHitArea.width - 5,
				y
			});
		}
		if (frameNumber === 7) {
			self.removeAttackHitArea();
		}
	}

	/**
	 * @param {number} frameNumber
	 * @returns {void}
	 */
	function showEenemy3AttackHitArea(frameNumber) {
		const y = self.attackHitArea.y = self.body.y - self.body.height;
		const w = 30;
		const h = 30;

		if (frameNumber === 2) {
			self.showAttackHitArea({
				x: self.body.x + self.attackHitArea.halfWidth() - 5,
				flipX: self.body.x - self.attackHitArea.width - 12,
				y,
				w,
				h
			});
		}
		if (frameNumber === 4) {
			self.removeAttackHitArea();
		}
		if (frameNumber === 5) {
			self.showAttackHitArea({
				x: self.body.x + self.attackHitArea.halfWidth() - 5,
				flipX: self.body.x - self.attackHitArea.width - 12,
				y,
				w,
				h
			});
		}
		if (frameNumber === 7) {
			self.removeAttackHitArea();
		}
	}

	function updateMovement() {
		if (self.vy > 0) {
			self.falling = true;
		}
	}

	function updateActions() {
		if (self.gotHit) {
			return;
		}

		switch (self.action) {
		case 'chase':
			actionChase();
			break;
		case 'attack':
			actionAttack();
			break;
		case 'run-away':
			actionRunAway();
			break;
		case 'stand':
			actionStand();
			break;
		}
	}

	/**
	 * @param {TEnemyActions} [ forcedAction ]
	 * @returns {void}
 	*/
	function autoDetectActions(forcedAction) {
		if (self.gotHit) {
			return;
		}

		let actions = ENEMY_ACTIONS;

		if (enemyNature === 'attacker') {
			actions = ENEMY_ACTIONS.filter(a => a !== 'run-away');
		}

		/** @type {TEnemyActions} */
		let action = forcedAction || getArrayRandomValue(actions);

		if (!isWithinTargetRange() && action === 'attack') {
			action = getArrayRandomValue(actions.filter(a => a !== 'attack'));
		}

		middlewareOnDetectActions(action);

		self.prevAction = self.action;
		self.action = action;
	}

	/**
	 * @param {TEnemyActions} action
	 * @returns {void}
	 */
	function middlewareOnDetectActions(action) {
		if (self.action === 'none') {

			if (action === 'stand') {
				const t = Game.timer.wait({
					time: 1000,
					onComplete: () => {
						resetAction();
					}
				});
				timers.push(t);
			}

			if (action === 'run-away') {
				// const runOpposite = getOppositeFlipH();
				const flipSides = /** @type {TFlipHSide[]} */(['left', 'right']);
				const randSide = getArrayRandomValue(flipSides);

				self.flip(randSide);

				const t = Game.timer.wait({
					time: 3000,
					onComplete: () => {
						resetAction();
					}
				});
				timers.push(t);
			}

		}
	}

	function actionChase() {
		if (self.grounded) {
			self.skin.play('run');
		}

		if (isBehindPlayer()) {
			self.flip('right');
		} else {
			self.flip('left');
		}

		if (!isWithinTargetRange()) {
			self.vx = self.flipHValue() * self.speedX;
			followConstant(self.body, Game.root.player.body, self.speedX, true, false);
		} else {
			resetAction();
			autoDetectActions('attack');
		}
	}

	function actionAttack() {
		if (isAttack()) {
			if (self.grounded) {
				attack();
				self.skin.play('attack');
			}
		}
	}

	function actionRunAway() {
		if (self.grounded) {
			self.skin.play('run');
		}
		self.vx = self.flipHValue() * self.speedX;
	}

	function actionStand() {
		self.vx *= 0.3;
		if (self.grounded) {
			self.skin.play('idle');
		}
	}

	function attack() {
		self.attacking = true;
		self.vx = 0;
	}

	function vsWalls() {
		for (let i = 0; i < Game.root.walls.length; i++) {
			const wall = Game.root.walls[i];

			const test = hitTest(wall, self.body);

			if (test.hit) {
				if (test.side === 'right' && self.vx >= 0) {
					self.flip('left');
				} else if (test.side === 'left' && self.vx <= 0) {
					self.flip('right');
				}
			}
		}
	}

	function vsAttackPlayer() {
		const player = Game.root.player;
		if (!player || !self.attackHitArea.parent) {
			return;
		}
		const test = hitTest(player.body, self.attackHitArea);
		if (test.hit && player.health) {
			player.receiveDamage(1, self);
		}
	}

	function killTimers() {
		timers.forEach(t => {
			Game.timer.killWait(t);
		});

		timers.length = 0;
	}

	function getOppositeFlipH() {
		const side =  self.flipH === 'left' ? 'right' : 'left';

		return side;
	}

	function resetAction() {
		self.action = 'none';
		self.attacking = false;
		killTimers();
	}

	function isAttack() {
		return !self.attacking;
	}

	function isJump() {
		return !self.jumping;
	}

	function isBehindPlayer() {
		return Boolean(self.body.x <= Game.root.player.body.x);
	}

	function isDetectActions() {
		return self.action === 'none';
	}

	function isWithinTargetRange(range=20) {
		const d = distance(self.body, Game.root.player.body); 
		return Boolean(d <= range);
	}

	return self;
}
