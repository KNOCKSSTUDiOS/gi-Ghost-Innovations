import { createGIConfigEngine } from "./config-engine";
import { createGIMemoryEngine } from "./memory-engine";
import { createGISessionEngine } from "./session-engine";
import { createGIAuthEngine } from "./auth-engine";
import { createGIUpgradeEngine } from "./upgrade-engine";
import { createGILoggingEngine } from "./logging-engine";
import { createGIWebhookEngine } from "./webhook-engine";
import { createGIHookRegistry } from "./hook-registry";
import { createGIEngine } from "./engine-loader";
import { GI_EVENTS } from "./event-map";

export interface GIBootstrapConfig {
  config?: any;
  memory?: any;
  session?: any;
  auth?: any;
  upgrades?: any;
  logging?: any;
  webhooks?: any;
  engine?: any;
}

export async function GIBootstrap(options: GIBootstrapConfig = {}) {
  // CONFIG
  const config = createGIConfigEngine(options.config);

  // LOGGING
  const logs = createGILoggingEngine(options.logging);

  // MEMORY
  const memory = createGIMemoryEngine(options.memory);

  // SESSION
  const sessions = createGISessionEngine(options.session);

  // AUTH
  const auth = createGIAuthEngine({
    secret: config.get("GI_SECRET") || "default-secret",
    ...(options.auth || {})
  });

  // UPGRADES
  const upgrades = createGIUpgradeEngine(options.upgrades);

  // WEBHOOKS
  const webhooks = createGIWebhookEngine(options.webhooks);

  // HOOK REGISTRY
  const hooks = createGIHookRegistry(webhooks);

  // ENGINE CORE
  const engine = await createGIEngine({
    ...options.engine,
    core: { config, memory, sessions, auth, upgrades, logs, hooks }
  });

  // Emit startup events
  await hooks.emit(GI_EVENTS.ENGINE_STARTED, { timestamp: Date.now() });

  // Apply pending upgrades
  for (const up of upgrades.listUpgrades()) {
    if (!up.applied) {
      upgrades.applyUpgrade(up.id, engine);
      await hooks.emit(GI_EVENTS.UPGRADE_APPLIED, up);
    }
  }

  // Engine ready
  await hooks.emit(GI_EVENTS.ENGINE_READY, { timestamp: Date.now() });

  return {
    config,
    logs,
    memory,
    sessions,
    auth,
    upgrades,
    webhooks,
    hooks,
    engine
  };
}

