/**
 * Proxy config for local-only development.
 * When BACKEND_URL is set in .env, the frontend talks directly to the backend
 * (no proxy needed). This proxy is only used when running locally without
 * BACKEND_URL set, to avoid CORS issues against a local backend.
 */
const path = require('path');
const { loadEnv } = require('./scripts/parse-env');

const FRONTEND_DIR = __dirname;
const DEFAULT_BACKEND = 'http://localhost:8000';

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
