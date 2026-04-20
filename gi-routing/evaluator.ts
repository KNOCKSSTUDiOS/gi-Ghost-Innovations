import { getRoutesFor } from "./store";

export function resolveModel(user_id: string, action: string, project?: string) {
  const matches = getRoutesFor(user_id, action, project);

  if (matches.length === 0) {
    return { model: "gi-default", fallback: [] };
  }

  // First match wins
  const route = matches[0];

  return {
    model: route.model,
    fallback: route.fallback ?? []
  };
}

