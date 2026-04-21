export function wait(ms = 0) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function timeout(promise, ms = 5000) {
  let timer;
  const timeoutPromise = new Promise((_, reject) => {
    timer = setTimeout(() => reject(new Error("Timeout exceeded")), ms);
  });

  return Promise.race([
    promise.finally(() => clearTimeout(timer)),
    timeoutPromise
  ]);
}

export function wrap(promise) {
  return promise
    .then(data => [null, data])
    .catch(err => [err, null]);
}
