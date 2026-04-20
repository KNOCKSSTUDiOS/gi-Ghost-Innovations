// G.I. MEMORY ENGINE — Core
// Handles short-term, long-term, and project memory.

interface MemoryItem {
  id: string;
  user_id: string;
  project?: string;
  type: "short" | "long" | "project";
  content: string;
  tags: string[];
  created: number;
}

const memoryStore: MemoryItem[] = [];

// ---------- WRITE MEMORY ----------
export function giRemember(
  user_id: string,
  content: string,
  type: "short" | "long" | "project" = "short",
  tags: string[] = [],
  project?: string
) {
  const item: MemoryItem = {
    id: "mem-" + Math.random().toString(36).substring(2, 10),
    user_id,
    project,
    type,
    content,
    tags,
    created: Date.now()
  };

  memoryStore.push(item);
  return item;
}

// ---------- READ MEMORY ----------
export function giRecall(user_id: string, query: string, project?: string) {
  const results = memoryStore
    .filter(m => m.user_id === user_id)
    .filter(m => !project || m.project === project)
    .map(m => ({
      ...m,
      score: scoreMatch(m.content, query, m.tags)
    }))
    .filter(m => m.score > 0.2)
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);

  return results;
}

// ---------- SIMPLE MATCH SCORING ----------
function scoreMatch(content: string, query: string, tags: string[]) {
  const q = query.toLowerCase();
  let score = 0;

  if (content.toLowerCase().includes(q)) score += 0.6;
  if (tags.some(t => t.toLowerCase().includes(q))) score += 0.4;

  return score;
}

