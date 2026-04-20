export const statusService = () => {
  return {
    ok: true,
    service: "G.I. Backend Service Layer",
    uptime: process.uptime(),
    timestamp: Date.now()
  };
};
