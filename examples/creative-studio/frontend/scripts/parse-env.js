/**
 * Minimal .env file parser. Returns an object of key-value pairs.
 * Supports: KEY=VALUE, KEY="VALUE", KEY='VALUE', blank lines, # comments.
 */
const fs = require('fs');
const path = require('path');

function parseEnvFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const env = {};
  for (const line of content.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eqIndex = trimmed.indexOf('=');
    if (eqIndex === -1) continue;
    const key = trimmed.slice(0, eqIndex).trim();
    let value = trimmed.slice(eqIndex + 1).trim();
    if ((value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    env[key] = value;
  }
  return env;
}

function loadEnv(frontendDir) {
  const envPath = path.join(frontendDir, '.env');
  const examplePath = path.join(frontendDir, '.env.example');

  if (fs.existsSync(envPath)) {
    return { env: parseEnvFile(envPath), source: '.env' };
  }
  if (fs.existsSync(examplePath)) {
    console.warn('\x1b[33m[env] .env not found — falling back to .env.example\x1b[0m');
    return { env: parseEnvFile(examplePath), source: '.env.example' };
  }
  return { env: {}, source: null };
}

module.exports = { parseEnvFile, loadEnv };
