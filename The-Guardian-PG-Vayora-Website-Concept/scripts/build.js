import { cp, copyFile, mkdir, rm } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const output = join(root, 'dist');

// Build a clean, deploy-only static folder. Netlify publishes only this directory.
await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
await copyFile(join(root, 'index.html'), join(output, 'index.html'));
await cp(join(root, 'assets'), join(output, 'assets'), { recursive: true });
await copyFile(join(root, 'robots.txt'), join(output, 'robots.txt'));

console.log('Static site built successfully into dist/');
console.log('Publish this folder on Netlify; no server-side runtime is required.');
