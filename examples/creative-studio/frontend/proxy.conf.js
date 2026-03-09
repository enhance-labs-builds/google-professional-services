/**
 * Dynamic proxy config that reads BACKEND_URL from .env at dev-server startup.
 */
const path = require('path');
const { loadEnv } = require('./scripts/parse-env');

const FRONTEND_DIR = __dirname;
const DEFAULT_BACKEND = 'https://cstudio-be-577666195296.us-central1.run.app';

const { env } = loadEnv(FRONTEND_DIR);
const target = env.BACKEND_URL || DEFAULT_BACKEND;

console.log(`\x1b[36m[proxy] Routing /api/* → ${target}\x1b[0m`);

module.exports = {
  '/api': {
    target,
    secure: true,
    changeOrigin: true,
    logLevel: 'debug',
  },
};
