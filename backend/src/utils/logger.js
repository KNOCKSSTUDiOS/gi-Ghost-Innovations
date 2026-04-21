const LEVELS = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3
};

let currentLevel = LEVELS.info;

export function setLogLevel(level = "info") {
  if (LEVELS[level] !== undefined) {
    currentLevel = LEVELS[level];
  }
}

export function log(level, ...args) {
  if (LEVELS[level] >= currentLevel) {
    console[level](...args);
  }
}

export function debug(...args) {
  log("debug", ...args);
}

export function info(...args) {
  log("info", ...args);
}

export function warn(...args) {
  log("warn", ...args);
}

export function error(...args) {
  log("error", ...args);
}

