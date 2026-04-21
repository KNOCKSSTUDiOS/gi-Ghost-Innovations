import { GI_Core } from "../gi-core/index";
import { GI_Router } from "../gi-router/index";
import { GI_Guardian } from "../gi-guardian/index";
import { GI_Shield } from "../gi-shield/index";
import { GI_Language } from "../gi-language/index";
import { GI_Sensory } from "../gi-sensory/index";
import { GI_Actions } from "../gi-actions/index";
import { GI_Access } from "../gi-access/index";
import { GI_Logs } from "../gi-logs/index";

export class GI_Engine {
  core: any;
  router: any;
  guardian: any;
  shield: any;
  language: any;
  sensory: any;
  actions: any;
  access: any;
  logs: any;

  constructor(config: any = {}) {
    this.core = new GI_Core(config.core);
    this.router = new GI_Router(config.router);
    this.guardian = new GI_Guardian(config.guardian);
    this.shield = new GI_Shield(config.shield);
    this.language = new GI_Language(config.language);
    this.sensory = new GI_Sensory(config.sensory);
    this.actions = new GI_Actions(config.actions);
    this.access = new GI_Access(config.access);
    this.logs = new GI_Logs(config.logs);
  }

  async init() {
    await this.core.init();
    await this.router.init();
    await this.guardian.init();
    await this.shield.init();
    await this.language.init();
    await this.sensory.init();
    await this.actions.init();
    await this.access.init();
    await this.logs.init();

    this.link();
    return this;
  }

  link() {
    this.core.use("router", this.router);
    this.core.use("guardian", this.guardian);
    this.core.use("shield", this.shield);
    this.core.use("language", this.language);
    this.core.use("sensory", this.sensory);
    this.core.use("actions", this.actions);
    this.core.use("access", this.access);
    this.core.use("logs", this.logs);

    this.router.bind(this.core);
    this.guardian.bind(this.core);
    this.shield.bind(this.core);
    this.language.bind(this.core);
    this.sensory.bind(this.core);
    this.actions.bind(this.core);
    this.access.bind(this.core);
    this.logs.bind(this.core);
  }
}

export async function createGIEngine(config: any = {}) {
  const engine = new GI_Engine(config);
  await engine.init();
  return engine;
}

