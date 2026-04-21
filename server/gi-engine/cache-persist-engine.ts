import fs from "fs";
import path from "path";

export interface GICachePersistEntry<T = any> {
  value: T;
  expiresAt: number | null;
}

export interface GICachePersistConfig {
  dir?: string;
  ttl?: number;
}

export class GI_CachePersistEngine {
  private dir: string;
  private ttl: number;
  private memory: Map<string, GICachePersistEntry<any>>;

  constructor(config: GICachePersistConfig = {}) {
    this.dir = config.dir ?? path.join(process.cwd(), "cache");
    this.ttl = config.ttl ?? 1000 * 60 * 60 * 24; // 24 hours
    this.memory = new Map();

    if (!fs.existsSync(this.dir)) {
      fs.mkdirSync(this.dir, { recursive: true });
    }

    this.loadAll();
  }

  private file(key: string) {
    return path.join(this.dir, `${key}.json`);
  }

  private loadAll() {
    const files = fs.readdirSync(this.dir);
    for (const f of files) {
      if (!f.endsWith(".json")) continue;
      const key = f.replace(".json", "");
      try {
        const raw = fs.readFileSync(this.file(key), "utf8");
        const entry = JSON.parse(raw) as GICachePersistEntry<any>;

        if (entry.expiresAt && entry.expiresAt < Date.now()) {
          fs.unlinkSync(this.file(key));
          continue;
        }

        this.memory.set(key, entry);
      } catch {
        continue;
      }
    }
  }

  set<T = any>(key: string, value: T, ttl?: number) {
    const expiresAt = ttl ? Date.now() + ttl : Date.now() + this.ttl;
    const entry: GICachePersistEntry<T> = { value, expiresAt };

    this.memory.set(key, entry);
    fs.writeFileSync(this.file(key), JSON.stringify(entry, null, 2), "utf8");
  }

  get<T = any>(key: string): T | null {
    const entry = this.memory.get(key);
    if (!entry) return null;

    if (entry.expiresAt && entry.expiresAt < Date.now()) {
      this.delete(key);
      return null;
    }

    return entry.value as T;
  }

  delete(key: string) {
    this.memory.delete(key);
    const f = this.file(key);
    if (fs.existsSync(f)) fs.unlinkSync(f);
  }

  clear() {
    this.memory.clear();
    const files = fs.readdirSync(this.dir);
    for (const f of files) {
      if (f.endsWith(".json")) {
        fs.unlinkSync(path.join(this.dir, f));
      }
    }
  }

  keys() {
    return [...this.memory.keys()];
  }

  size() {
    return this.memory.size;
  }
}

export function createGICachePersistEngine(config?: GICachePersistConfig) {
  return new GI_CachePersistEngine(config);
}

