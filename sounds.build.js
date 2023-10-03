import fs from 'fs-extra';
import path from 'path';
import shell from 'shelljs';

const { readdirSync } = fs;
const { resolve } = path;

const dir = resolve('media/sounds/');
const out = `${dir}/out`;
const fileName = 'game-sounds';
const jsonFileName = `${fileName}.json`;
const files = readdirSync(dir);
const finalJsonPath = `${out}/${jsonFileName}`;

console.log('...');
console.log('Generating audio-sprite');
console.log('Total Files...');
console.log(files);
console.log('...');

const cmd = `audiosprite --path '${dir}' --output '${out}/${fileName}' -f howler --export mp3 '${dir}/*.mp3'`;

if (shell.exec(cmd).code !== 0) {
	shell.echo('Error command failed!');
	shell.exit(1);
}

console.log('...');
shell.echo(`Created ${finalJsonPath}`);

