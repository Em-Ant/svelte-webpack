import { defineConfig, type Plugin } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { execSync } from 'node:child_process';

function versionMetaPlugin(): Plugin {
  const { version } = require('./package.json');
  const gitHash = execSync('git rev-parse --short HEAD').toString().trim();
  const timestamp = new Date().toISOString();
  const tag = `${version}-${gitHash}:${timestamp}`;

  return {
    name: 'version-meta-plugin',
    transformIndexHtml(html) {
      return html.replace('<!--VERSION-->', tag);
    },
    closeBundle() {
      console.log(`Build: ${version}`);
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [svelte(), versionMetaPlugin()],
});
