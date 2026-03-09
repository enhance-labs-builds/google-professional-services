/**
 * Reads PORT from .env and launches ng serve with the right flags.
 * Run via: npm start (package.json wires prestart + start)
 */
const { execSync } = require('child_process');
const path = require('path');
const { loadEnv } = require('./parse-env');

const FRONTEND_DIR = path.resolve(__dirname, '..');
const { env } = loadEnv(FRONTEND_DIR);
const port = env.PORT || '5173';

console.log(`\x1b[36m[start] Serving on http://localhost:${port}\x1b[0m`);
execSync(`npx ng serve --configuration local --port ${port}`, {
  stdio: 'inherit',
  cwd: FRONTEND_DIR,
});
