import { Group, Rectangle } from '@packages/displayObjects';

/**
 * @type {FPlatform}
 */
export function Platforms(world) {
	const wallsWidth = 100;
	const wallsSkinWidth = 10;
	const width = 464 + wallsWidth * 2;
	const height = 120;
	const groundX = -wallsWidth;

	const container = Group();
	world.addChild(container);

	const ground = Rectangle(width, 200, 'green', '', 0, groundX, 80);
	ground.name = 'ground';
	ground.alpha = 0;

	const wall1X = ground.x;
	const wall1 = Rectangle(wallsWidth, height, 'blue', '', 0, wall1X, 0);
	wall1.name = 'wall1';
	wall1.alpha = 0;

	const wall2X = ground.x + ground.width - wallsWidth;
	const wall2 = Rectangle(wallsWidth, height, 'blue', '', 0, wall2X, 0);
	wall2.name = 'wall2';
	wall2.alpha = 0;

	const wall1Skin = Rectangle(wallsSkinWidth, wall1.height, 'black', '', 0, 0, 0);
	const wall2Skin = Rectangle(wallsSkinWidth, wall2.height, 'black', '', 0, 0, 0);

	const colliders = [ground, wall1, wall2];
	const walls = [wall1, wall2];

	const w1 = {
		x: wall1X,
		ax: 0,
		vx: 0,
		speedX: 2
	};

	const w2 = {
		x: wall2X,
		ax: 0,
		vx: 0,
		speedX: 2
	};

	colliders.forEach(collider => {
		collider.visible = true;
		container.addChild(collider);
	});

	container.addChild(wall1Skin);
	container.addChild(wall2Skin);

	updateWallsSkin();

	function resetWallsPos() {
		w1.x = wall1X; 
		w1.ax = 0;
		w1.vx = 0;

		w2.x = wall2X; 
		w2.ax = 0;
		w2.vx = 0;

		wall1.x = w1.x;
		wall2.x = w2.x;

		updateWallsSkin();
	}

	function moveWalls(w1Dir=1, w2Dir=-1) {
		w1.vx += w1.ax;
		w2.vx += w2.ax;

		w1.x += w1.vx;
		w2.x += w2.vx;

		w1.vx = w1Dir * w1.speedX;
		w2.vx = w2Dir * w2.speedX;

		wall1.x = w1.x;
		wall2.x = w2.x;

		updateWallsSkin();
	}

	function updateWallsSkin() {
		wall1Skin.x = wall1.x + wall1.width - wall1Skin.width;
		wall2Skin.x = wall2.x; 
	}

	return {
		colliders,
		walls,
		resetWallsPos,
		moveWalls
	};
}
