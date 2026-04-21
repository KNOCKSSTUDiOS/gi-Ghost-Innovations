export function createError(message = "Error", status = 500, data = null) {
  const err = new Error(message);
  err.status = status;
  err.data = data;
  return err;
}

export function assert(condition, message = "Assertion failed") {
  if (!condition) {
    throw new Error(message);
  }
}
