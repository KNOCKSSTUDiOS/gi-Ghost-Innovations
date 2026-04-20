import os from "os";

export function getSystemMetrics() {
  const cpus = os.cpus();

  return {
    cpu_load: cpus.map(c => c.times),
    total_memory: os.totalmem(),
    free_memory: os.freemem(),
    used_memory: os.totalmem() - os.freemem(),
    uptime: os.uptime(),
    loadavg: os.loadavg(),
    platform: os.platform(),
    arch: os.arch()
  };
}

