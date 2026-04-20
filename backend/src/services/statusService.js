export const statusService = () => {
  return {
    status: "ok",
    system: "G.I. Backend",
    uptime: process.uptime()
  };
};
