export function wrap(fn) {
  return function (req, res, next) {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

export async function parallel(tasks = []) {
  return Promise.all(tasks.map(t => Promise.resolve().then(() => t())));
}

