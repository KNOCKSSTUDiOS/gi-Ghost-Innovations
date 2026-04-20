// G.I. CORE — Orchestrator Brain
// This file receives processed data from all subsystems
// and decides: reply, actions, voice style, safety, routing.

import { GiIdentity, GiContext, GiLanguageInfo } from "../types";
import { runGiGuardian } from "../gi-guardian/guardian";
import { routeGiModel } from "../gi-router/router";
import { readGiSensoryContext, writeGiSensoryContext } from "../gi-sensory/sensory";
import { applyGiVoiceStyle } from "../gi-voices/voices";
import { buildGiActions } from "../gi-actions/actions";
import { detectLanguage } from "../gi-language/language";
import { logGiEvent } from "../gi-logs/logs";
import { checkGiShield } from "../gi-shield/shield";

export async function giCoreOrchestrate(body: any) {
  const identity: GiIdentity = body._identity;
  const context: GiContext = body.gi_context ?? {};
  const message: string = body.gi_message;

  // ---------- Shield (rate limit) ----------
  const shield = checkGiShield(identity.user_id);
  if (!shield.allowed) {
    logGiEvent("shield_block", { user: identity.user_id });
    return {
      gi_reply: shield.message,
      gi_actions: [],
      gi_meta: {
        tier: identity.tier,
        role: identity.role,
        mode: context.mode,
      },
    };
  }

  // ---------- Language Detection ----------
  const langInfo: GiLanguageInfo = detectLanguage(message);

  // ---------- Guardian (safety) ----------
  const guardian = runGiGuardian(message, langInfo);
  if (!guardian.allowed) {
    logGiEvent("guardian_block", {
      user: identity.user_id,
      reason: guardian.reason,
      policy: guardian.policy,
    });

    const safeReply =
      guardian.reason === "copyright"
        ? "I can’t provide copyrighted content, but I can summarize or discuss it."
        : "I can’t assist with that, but I can help with safe alternatives.";

    return {
      gi_reply: safeReply,
      gi_actions: [],
      gi_meta: {
        tier: identity.tier,
        role: identity.role,
        mode: context.mode,
        language: langInfo.language,
      },
    };
  }

  // ---------- Sensory Context ----------
  const sensory = readGiSensoryContext(identity, body.gi_client, context);
  logGiEvent("sensory_context", { user: identity.user_id, sensory });

  // ---------- Model Routing ----------
  const route = routeGiModel(identity, context);
  logGiEvent("model_route", {
    user: identity.user_id,
    model: route.model,
    provider: route.provider,
  });

  // ---------- MODEL CALL (stub) ----------
  const baseReply = `G.I. online. Operating in ${context.mode ?? "assist"} mode.`;

  // ---------- Voice Style ----------
  const styledReply = applyGiVoiceStyle(context.voice, baseReply);

  // ---------- Actions ----------
  const actions = buildGiActions(identity, context, message);

  // ---------- Write Sensory ----------
  writeGiSensoryContext(identity, body.gi_client, { last_message: message });

  // ---------- Final Response ----------
  const response = {
    gi_reply: styledReply,
    gi_actions: actions,
    gi_meta: {
      tier: identity.tier,
      role: identity.role,
      mode: context.mode,
      language: langInfo.language,
      tokens_used: 0,
    },
  };

  logGiEvent("response", {
    user: identity.user_id,
    meta: response.gi_meta,
    actions: response.gi_actions,
  });

  return response;
}

