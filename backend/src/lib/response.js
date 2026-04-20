export const send = (res, data, status = 200) => {
  res.status(status).json({
    success: status >= 200 && status < 300,
    data
  });
};
