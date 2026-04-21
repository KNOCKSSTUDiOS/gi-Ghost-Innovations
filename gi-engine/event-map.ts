export const GI_EVENTS = {
  ENGINE_STARTED: "engine.started",
  ENGINE_READY: "engine.ready",

  MEMORY_ADDED_SHORT: "memory.added.short",
  MEMORY_ADDED_LONG: "memory.added.long",
  MEMORY_RECALL: "memory.recall",

  AUTH_LOGIN: "auth.login",
  AUTH_LOGOUT: "auth.logout",
  AUTH_TOKEN_ISSUED: "auth.token.issued",

  SESSION_CREATED: "session.created",
  SESSION_UPDATED: "session.updated",
  SESSION_DESTROYED: "session.destroyed",

  UPGRADE_CREATED: "upgrade.created",
  UPGRADE_APPLIED: "upgrade.applied",

  WEBHOOK_TRIGGERED: "webhook.triggered",
  WEBHOOK_REGISTERED: "webhook.registered",

  ROUTER_REQUEST: "router.request",
  ROUTER_RESPONSE: "router.response",

  LANGUAGE_PARSE: "language.parse",
  LANGUAGE_GENERATE: "language.generate",

  ACTION_EXECUTED: "action.executed",
  ACTION_FAILED: "action.failed",

  SENSORY_INPUT: "sensory.input",
  SENSORY_OUTPUT: "sensory.output",

  GUARDIAN_BLOCKED: "guardian.blocked",
  GUARDIAN_ALLOWED: "guardian.allowed",

  SHIELD_FILTERED: "shield.filtered",
  SHIELD_PASSED: "shield.passed"
} as const;

export type GIEventKey = keyof typeof GI_EVENTS;
export type GIEventValue = typeof GI_EVENTS[GIEventKey];

