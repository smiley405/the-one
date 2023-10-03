import { Rectangle } from '@packages/displayObjects';

/**
 * @type {FPlatform}
 */
export function Platforms(world) {
	const width = 464;
	const height = 120;

	const ground = Rectangle(width, 200, 'blue', '', 0, 0, 80);
	ground.name = 'ground';
	ground.alpha = 0;

	const wall1X = ground.x - 10;
	const wall1 = Rectangle(10, height, 'black', '', 0, wall1X, 0);
	wall1.name = 'wall1';
	wall1.alpha = 1;

	const wall2X = ground.x + ground.width;
	const wall2 = Rectangle(10, height, 'black', '', 0, wall2X, 0);
	wall2.name = 'wall2';
	wall1.alpha = 1;

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
		// collider.alpha = 0.5;
		world.addChild(collider);
	});

	function resetWallsPos() {
		w1.x = wall1X; 
		w1.ax = 0;
		w1.vx = 0;

		w2.x = wall2X; 
		w2.ax = 0;
		w2.vx = 0;

		wall1.x = w1.x;
		wall2.x = w2.x;
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
	}

	return {
		colliders,
		walls,
		resetWallsPos,
		moveWalls
	};
}
