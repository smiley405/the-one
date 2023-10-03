/**
 * @type {FSound}
 */
export function GameSound(sound) {
	let music = 0;

	return {
		playMusic() {
			if (music && sound.playing(music)) {
				return;
			}
			music = sound.play('music');
			sound.loop(true, music);
		},
		playSFX(name) {
			sound.play(name);
		},
		pause(enable) {
			if (enable && music) {
				sound.play(music);
			} else {
				sound.pause(music);
			}
		}

	};
}
