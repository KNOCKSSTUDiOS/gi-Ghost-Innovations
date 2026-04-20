// G.I. GUARDIAN — Policy Schema

export interface GiGuardianPolicy {
  id: string;
  name: string;
  description: string;

  // Allowed or blocked actions
  allow_actions: string[];
  block_actions: string[];

  // Memory rules
  allow_memory_write: boolean;
  allow_memory_read: boolean;

  // File access rules
  allow_file_upload: boolean;
  allow_file_download: boolean;

  // Model routing rules
  allowed_models: string[];

  // Project scope
  project?: string;

  // User scope
  user_id?: string;

  created: number;
}

