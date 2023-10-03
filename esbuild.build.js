import esbuild from "esbuild";
import { zip } from "zip-a-folder";
import fs from "fs-extra";
import shell from "shelljs";
import path from 'path';

const r = (src) => path.resolve(process.cwd(), src);

async function build() {
	const htmlSrc = r('./index.html');
	const htmlOut = r('./out/index.html');

	const cssSrc = r('./css');
	const cssOut = r('./out/css');

	const imagesSrc = r('./media/images');
	const imagesOut = r('./out/media/images');

	const soundsSrc = r('./media/sounds/out');
	const soundsOut = r('./out/media/sounds/out');

	const tiledSrc = r('./media/tiled');
	const tiledOut = r('./out/media/tiled');

	const mainSrc = r('./src/main.js');
	const outfile = r('./out/game.min.js');

	const outDir = r('./out');
	const distDir = r('./dist');
	const zipFile =  r('dist/game.zip');

	/**
	 * @param {string} src
	 * @param {string} out
	 * @returns {Promise}
	*/
	async function copy(src, out) {
		await fs.copy(src, out, {overwrite: true});
		console.log('...');
		console.log(`Copying ${src}`);
		console.log(`Copied to ${out}`);
	}

	await copy(htmlSrc, htmlOut);
	await copy(cssSrc, cssOut);
	await copy(imagesSrc, imagesOut);
	await copy(soundsSrc, soundsOut);
	await copy(tiledSrc, tiledOut);

	await esbuild
		.build({
			entryPoints: [mainSrc],
			bundle: true,
			outfile, 
			write: true,
			minify: true,
			target: 'es6'
		})
		.then((result) => {
			//
		})
		.catch(() => process.exit(1));

	fs.mkdir(distDir, { recursive: true }, (err) => {
		if (err) throw err;
	});
	await zip(outDir, zipFile);
	console.log('...');
	console.log(`zip file to ${zipFile}`);

	// after this use advzip to further recompress //
	// **must have advzip installed globally to use the following command//
	// execute shell command
	const cmd = `advzip -z -4 ${zipFile}`;
	console.log('...');
	console.log(cmd);
	if (shell.exec(cmd).code !== 0) {
		shell.echo("Error: " + cmd + " failed");
		shell.exit(1);
	}
	shell.echo("Task completed!!! \n");
}

build();
