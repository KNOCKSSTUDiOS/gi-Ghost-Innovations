// Hooks memory into the core engine pipeline

import { giRecall, giRemember } from "../gi-memory/memory";

export async function injectMemory(user_id: string, message: string, project?: string) {
  const recalled = giRecall(user_id, message, project);

  // Auto-write short-term memory
  giRemember(user_id, message, "short", ["message"], project);

  return recalled;
}

