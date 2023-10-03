import { SoundLoader } from './SoundLoader';
import { TiledLoader } from './TiledLoader';
import { TPSImageLoader } from './TPSImageLoader';

/**
 * @type {FLoader}
 */
export function Loader(props) {
	const total = [
		Boolean(props.tiledFiles),
		Boolean(props.soundSprite),
		Boolean(props.tiledFiles)
	].filter(v => v);

	let loadedCount = 0;

	if (props.tpsJSONFiles) {
		TPSImageLoader(props.tpsJSONFiles, () => {
			if (props.onLoadImages) props.onLoadImages();
			onLoad();
		});
	}

	if (props.soundSprite) {
		SoundLoader(props.soundSprite, (sound) => {
			if (props.onLoadSounds) props.onLoadSounds(sound);
			onLoad();
		});
	}

	if (props.tiledFiles) {
		TiledLoader(props.tiledFiles, () => {
			if (props.onLoadTileds) props.onLoadTileds();
			onLoad();
		});
	}

	function onLoad() {
		loadedCount += 1;

		if (loadedCount >= total.length) {
			props.onLoadComplete();
		}
	}
}
