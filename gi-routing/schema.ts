// G.I. MODEL ROUTING — Schema

export interface GiModelRoute {
  id: string;
  name: string;

  // Trigger conditions
  match_action?: string;
  match_tag?: string;
  match_project?: string;
  match_user?: string;

  // Routing target
  model: string;

  // Optional fallback chain
  fallback?: string[];

  created: number;
}

