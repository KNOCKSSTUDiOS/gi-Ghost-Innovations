export function success(res, data = {}, message = "OK") {
  return res.json({
    ok: true,
    message,
    ...data
  });
}

export function failure(res, error = "Error", code = 500) {
  return res.status(code).json({
    ok: false,
    error
  });
}

