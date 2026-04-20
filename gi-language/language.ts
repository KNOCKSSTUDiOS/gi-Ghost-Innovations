// G.I. LANGUAGE — Language Detection Engine (Stub)
// Detects the language of the incoming message.
// Expand later with real multilingual detection.

import { GiLanguageInfo } from "../types";

export function detectLanguage(message: string): GiLanguageInfo {
  // Placeholder logic — always English for now
  return {
    language: "en",
    confidence: 0.99,
  };
}

