import { Boot } from '@packages/boot';
import { CanvasLayers } from '@packages/canvas-layers';
import { Group, Stage } from '@packages/displayObjects';
import { Keyboard } from '@packages/inputs';
import { Loader } from '@packages/loader';
import { renderCanvasLayer } from '@packages/render';
import { Resizer } from '@packages/resizer';
import { Ticker } from '@packages/ticker';
import { Timer } from '@packages/timer';
import { getArrayRandomValue, randomInt } from '@packages/utils/math';
import { getDivElementById } from '@packages/utils/misc';

import { PLAYER_EVENTS } from './Events';
import { Game } from './Game';
import { Enemy } from './gameObjects/actor/Enemy';
import { Player } from './gameObjects/actor/Player';
import { Background } from './gameObjects/Background';
import { Grass } from './gameObjects/Grass';
import { Platforms } from './gameObjects/Platforms';
import { GameSound } from './GameSound';
import { shakeScreen, zoom } from './utils';

// TODO: make auto-responsive on game pause resume, like animation, velocity

Resizer({width: 464, height: 120}, getDivElementById('root'));

Boot(() => {
	Loader({
		tpsJSONFiles: [
			'media/images/game-images0.json'	
		],
		soundSprite: 'media/sounds/out/game-sounds.json',
		tiledFiles: [
			'media/tiled/level1.json'
		],
		onLoadSounds: (sound) => {
			Game.sound = GameSound(sound);
		},
		onLoadComplete: () => {
			getDivElementById('loader').style.display = 'none';
			onload();
		}
	});
	Game.timer = Timer();
	Game.key = Keyboard({ // TODO refactor KEyboard types
		'jump': {code: 'k'},
		'left': {code: 'a'},
		'right': {code: 'd'},
		'slash': {code: 'j'},
		'shoot': {code: 'h'},
		'ok': {code: ' '}
	});
	Game.ticker = Ticker({
		onVisibilityChange: (visible) => {
			Game.timer.pause(Date.now());
			if (Game.root) {
				Game.root.paused = visible; 
			}
			if (Game.sound) {
				Game.sound.pause(visible);
			}
		}
	});
	Game.layers = CanvasLayers();

	const gameDiv = getDivElementById('game');
	const gameLayer = Game.layers.add('game-canvas', 464, 120);

	gameDiv.appendChild(gameLayer.canvas);

	function onload() {
		const totalArrows = 10;
		let score = 0;
		let arrows = 0;
		let gameStarted = false;
		let gameOver = false;
		let stage = Stage(464, 120);

		// create a group world which re-calculates the size based on its childrens
		// and add everything in it instead of app.stage.
		let world = Group();
		let playerGroup = Group();
		let enemiesGroup = Group();

		stage.addChild(world);

		const background = Background([world, world]);
		const grass = Grass(world);

		world.addChild(enemiesGroup);
		world.addChild(playerGroup);

		const platforms = Platforms(world);
		/**
		 * @type {TPlayer | null}
		 */
		let player = null;

		/**
		 * @type {TEnemy[]}
		 */
		let enemies = [];

		/**
		 * @type {number[]}
		 */
		let enemySpawntimers = [];
		let enemiesInEachWaves = [0, 5, 10, 10, 8, 5]; // always start with [0] = 0 => no-wave, for quick & easy comparison
		let totalKillsInEachWaves = enemiesInEachWaves.map(() => 0);
		let isMoveWalls = false;

		document.body.addEventListener('mousedown', onDown, false);

		Game.ticker.add('update', update.bind(this));
		Game.ticker.add('render', render.bind(this));

		Game.root = {
			wave: 0,
			paused: false,
			world,
			walls: platforms.walls,
			platforms: platforms.colliders,
			playerGroup,
			enemiesGroup,
			enemies,
			gameOver: () => {
				return gameOver;
			},
			gameStarted: () => {
				return gameStarted;
			},
			arrows: () => {
				return arrows;
			},
			score: () => {
				return score;
			},
			setGameOver: (over) => {
				gameOver = over;
				displayGameOver();
				killEnemySpawnTimers();
			},
			setScore: (value, replace) => {
				const ui = getDivElementById('score');
				score = replace ? value : score + value;
				ui.innerHTML = 'kills: ' + score;
				zoom('score');

				if (!value) {
					return;
				}

				if (Game.root.wave >= enemiesInEachWaves.length-1) {

					Game.timer.wait({
						time: 3000,
						onComplete: () => {
							gameOver = true;
							displayGameWin();
							killEnemySpawnTimers();
						}
					});

					return;
				}

				updateKills();
				const isUpgradeWave = enemiesInEachWaves[Game.root.wave] === totalKillsInEachWaves[Game.root.wave];

				if (isUpgradeWave) {
					moveWalls();
					upgradeWaves();
					initSpawnEnemies();
				}

			},
			setHealth: (value) => {
				const ui = getDivElementById('health-text');
				ui.innerHTML = 'x ' + value;
				zoom('health-item');
			},
			setArrows: (value, replace) => {
				const ui = getDivElementById('arrows-text');
				let newArrows = arrows + value;

				if (newArrows >= totalArrows) {
					newArrows = totalArrows;
				}

				arrows = replace ? value : newArrows;
				ui.innerHTML = 'x ' + arrows;
				zoom('arrows-item');
			}
		};

		Game.emitter.on(PLAYER_EVENTS.ENTRY_LANDED, () => {
			shakeScreen('game');
		});

		reset();

		// const camera = Camera([world], gameLayer.canvas);

		function updateKills() {
			const wave = Game.root.wave;
			totalKillsInEachWaves[wave] = totalKillsInEachWaves[wave] + 1;
		}

		function upgradeWaves(time=3000) {
			Game.root.wave += 1;

			const wavesDiv = getDivElementById('waves');
			wavesDiv.style.display = 'block';
			wavesDiv.innerHTML = 'wave ' + Game.root.wave;

			Game.timer.wait({
				time,
				onComplete: () => {
					wavesDiv.style.display = 'none';
				}
			});
		}

		function initWaves() {
			Game.timer.wait({
				time: 1000,
				onComplete: () => {
					upgradeWaves();
					initSpawnEnemies();
				}
			});
		}


		/**
		 * @param {number} [time]
		 */
		function hideHelp(time=8000) {
			Game.timer.wait({
				time,
				onComplete: ()=> {
					getDivElementById('bottom-bar').style.display = 'none';
				}
			});
		}

		function displayGameOver() {
			getDivElementById('game-over').style.display = 'block';
			const title = getDivElementById('go-title');
			title.innerHTML = 'Game Over';
			hideHelp(0);

			const scoreUI = getDivElementById('go-score');
			scoreUI.innerHTML = 'kills: ' + score;
		}

		function displayGameWin() {
			const overDiv = getDivElementById('game-over');
			overDiv.style.display = 'block';

			const title = getDivElementById('go-title');
			title.innerHTML = 'You Win!';

			const scoreUI = getDivElementById('go-score');
			scoreUI.innerHTML = 'kills: ' + score;
		}

		function onDown() {
			if (!gameStarted) {
				getDivElementById('intro').style.display = 'none';
				hideHelp();
				initWaves();
				Game.sound.playMusic();
				gameStarted = true;
			}

			if (gameOver) {
				destroyAll();
				reset();
				initWaves();
			}
		}

		function reset() {
			getDivElementById('game-over').style.display = 'none';
			gameOver = false;
			Game.root.setArrows(totalArrows, true);
			Game.root.setScore(0, true);
			player = Player();
			Game.root.player = player; 
			Game.root.wave = 0;
			totalKillsInEachWaves = totalKillsInEachWaves.map(() => 0);
			isMoveWalls = false;
			platforms.resetWallsPos();
		}

		function initSpawnEnemies(time=2000) {
			Game.timer.wait({
				time,
				onComplete: () => {
					spawnEnemies();
				}
			});
		}

		function spawnEnemies() {
			const walls = platforms.walls;
			const pt1 = walls[0].x + walls[0].width;
			const pt2 = walls[1].x - walls[1].width;
			const y1 = 0;
			const y2 = walls[0].halfHeight();

			for (let i = 0; i < enemiesInEachWaves[Game.root.wave]; i++) {
				const randTime = randomInt(1000, 4000);

				const t = Game.timer.wait({
					time: randTime * i,
					onComplete: () => {
						spawnEnemy(i);
					}
				});
				enemySpawntimers.push(t);
			}

			/**
			 * @param {number} index
			 */
			function spawnEnemy(index) {
				const x = getArrayRandomValue([pt1, pt2]);
				const y = getArrayRandomValue([y1, y2]);
				/**
				 * @type {TEnemyTypes}
				 */
				const eType = getArrayRandomValue(['e1', 'e2', 'e3']);
				/**
				 * @type {TEnemyNature}
				 */
				const eNature = getArrayRandomValue(['attacker', 'none']);

				const e = Enemy({ enemyType: eType, enemyNature: eNature });
				e.name = e.name + index;
				e.body.x = x;
				e.body.y = y;
				if (x === pt2) {
					e.flip('left');
				}

				enemies.push(e);
			}
		}

		function moveWalls() {
			if (isMoveWalls) {
				return;
			}

			isMoveWalls = true;

			Game.timer.wait({
				time: 300,
				onComplete: () => {
					isMoveWalls = false;
				}
			});
		}

		function killEnemySpawnTimers() {
			enemySpawntimers.forEach(t => {
				Game.timer.killWait(t);
			});
			enemySpawntimers.length = 0;
		}

		function destroyAll() {
			if (player) {
				player.destroy();
				player = null;
			}
			enemies.forEach(e => {
				e.destroy();
			});
			enemies.length = 0;
			killEnemySpawnTimers();
			Game.timer.kill();

			playerGroup.children.forEach(e => {
				e.destroy();
			});

			enemiesGroup.children.forEach(e => {
				e.destroy();
			});
		}

		/**
		 * @type {FTickerUpdate}
		 */
		function update(dt) {
			Game.timer.update();

			if (!gameStarted || gameOver) {
				return;
			}
			if (player) {
				player.update();
				background.update(player);
				// grass.update(player);
				// camera.centerOver(player.body);
			}
			enemies.forEach((enemy, i) => {
				if (enemy.destroyed) {
					enemies.splice(i, 1);
				}
				enemy.update();
			});

			if (isMoveWalls) {
				platforms.moveWalls();
			}
		}

		/**
		 * @type {FTickerRender}
		 */
		function render(dt) {
			renderCanvasLayer(gameLayer, stage, dt);
		}

	}
});
