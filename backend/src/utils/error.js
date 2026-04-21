export function createError(message = "Unknown error", status = 500) {
  return { message, status };
}

export function throwError(message = "Unknown error", status = 500) {
  const err = new Error(message);
  err.status = status;
  throw err;
}
