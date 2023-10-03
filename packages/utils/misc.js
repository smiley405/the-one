import { ASSETS } from '@packages/assets-store';

/**
 * @param {string} path - full file path
 * @returns {string} - file name
 */
export function getFileNameFromPath(path) {
	const fileName = path.split('/').pop();
	return fileName;
}

/**
 * @param {string} id
 * @returns {HTMLDivElement}
 */
export function getDivElementById(id) {
	return /** @type {HTMLDivElement}*/(document.getElementById(id));
}

/**
 * @param {string} name
 * @returns {string[]}
 */
export function getAnimFrames(name) {
	let animSheet = [];
	for (let key in ASSETS.images) {
		if (key.includes(name)) {
			animSheet.push(key);
		}
	}
	return animSheet;
}

/**
 * @param {string} name
 * @returns {string}
 */
export function getAnimFrame(name) {
	return getAnimFrames(name)[0];
}

/**
 * @param {number} value
 * @returns {string}
 */
export function toCSSPX(value) {
	return value + 'px';
}

/**
 * @param {TDisplayObject} s1
 * @param {TDisplayObject} s2
 * @returns {number}
 */
export function distance(s1, s2) {
	const vx = s2.centerX() - s1.centerX(),
		vy = s2.centerY() - s1.centerY();
	return Math.sqrt(vx * vx + vy * vy);
}

/**
 * @param {TDisplayObject} follower
 * @param {TDisplayObject} leader
 * @param {number} speed
 * @param {boolean} followX
 * @param {boolean} followY
 * @returns {void}
 */
export function followEase(follower, leader, speed, followX=true, followY=true) {
	// Figure out the distance between the sprites
	var vx = leader.centerX() - follower.centerX(),
		vy = leader.centerY() - follower.centerY(),
		distance = Math.sqrt(vx * vx + vy * vy);

	// Move the follower if it's more than 1 pixel
	// away from the leader
	if (distance >= 1) {
		if (followX) {
			follower.x += vx * speed;
		}
		if (followY) {
			follower.y += vy * speed;
		}
	}
}

/**
 * @param {TDisplayObject} follower
 * @param {TDisplayObject} leader
 * @param {number} speed
 * @param {boolean} followX
 * @param {boolean} followY
 * @returns {void}
 */
export function followConstant(follower, leader, speed, followX=true, followY=true) {
	// Figure out the distance between the sprites
	var vx = leader.centerX() - follower.centerX(),
		vy = leader.centerY() - follower.centerY(),
		distance = Math.sqrt(vx * vx + vy * vy);

	// Move the follower if it's more than 1 move
	// away from the leader
	if (distance >= speed) {
		if (followX) {
			follower.x += (vx / distance) * speed;
		}
		if (followY) {
			follower.y += (vy / distance) * speed;
		}
	}
}
