// In-memory Guardian policy store

import { GiGuardianPolicy } from "./schema";

const policies: GiGuardianPolicy[] = [];

export function addPolicy(policy: GiGuardianPolicy) {
  policies.push(policy);
  return policy;
}

export function listPolicies() {
  return policies;
}

export function getPoliciesFor(user_id: string, project?: string) {
  return policies.filter(p =>
    (!p.user_id || p.user_id === user_id) &&
    (!p.project || p.project === project)
  );
}

