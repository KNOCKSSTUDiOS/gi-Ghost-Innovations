import { EngineLoader } from "./engine.loader";
import { EngineHooks } from "./engine.hooks";

export class EngineInstance {
  loader: EngineLoader;
  hooks: EngineHooks;

  constructor() {
    this.loader = new EngineLoader();
    this.hooks = new EngineHooks(this.loader.lifecycle);
  }

  async init() {
    await this.loader.init();
  }

  async ready() {
    await this.loader.ready();
  }

  async shutdown() {
    await this.loader.shutdown();
  }

  get config() {
    return this.loader.config;
  }

  get flags() {
    return this.loader.flags;
  }

  get state() {
    return this.loader.state;
  }
}

