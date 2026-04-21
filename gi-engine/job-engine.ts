import crypto from "crypto";

export interface GIJob {
  id: string;
  name: string;
  schedule: number; // ms interval
  nextRun: number;
  running: boolean;
  handler: Function;
}

export interface GIJobConfig {
  tick?: number;
}

export class GI_JobEngine {
  jobs: Map<string, GIJob>;
  tick: number;
  timer: any;
  active: boolean;

  constructor(config: GIJobConfig = {}) {
    this.jobs = new Map();
    this.tick = config.tick || 250;
    this.timer = null;
    this.active = false;
  }

  register(name: string, interval: number, handler: Function) {
    const job: GIJob = {
      id: crypto.randomUUID(),
      name,
      schedule: interval,
      nextRun: Date.now() + interval,
      running: false,
      handler
    };

    this.jobs.set(job.id, job);
    return job;
  }

  unregister(id: string) {
    this.jobs.delete(id);
  }

  list() {
    return [...this.jobs.values()];
  }

  async runJob(job: GIJob) {
    if (job.running) return;

    job.running = true;
    try {
      await job.handler();
    } catch (err) {
      // Jobs swallow errors by design — task engine handles retries
    }
    job.running = false;
    job.nextRun = Date.now() + job.schedule;
  }

  start() {
    if (this.active) return;
    this.active = true;

    const loop = async () => {
      if (!this.active) return;

      const now = Date.now();
      for (const job of this.jobs.values()) {
        if (job.nextRun <= now) {
          await this.runJob(job);
        }
      }

      this.timer = setTimeout(loop, this.tick);
    };

    loop();
  }

  stop() {
    this.active = false;
    if (this.timer) clearTimeout(this.timer);
  }
}

export function createGIJobEngine(config: GIJobConfig = {}) {
  return new GI_JobEngine(config);
}

