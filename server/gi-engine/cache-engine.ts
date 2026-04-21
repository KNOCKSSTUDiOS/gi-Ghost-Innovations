export interface GICacheEntry<T = any> {
  value: T;
  expiresAt: number | null;
}

export class GI_CacheEngine {
  private store: Map<string, GICacheEntry<any>>;

  constructor() {
    this.store = new Map();
  }

  set<T = any>(key: string, value: T, ttl?: number) {
    const expiresAt = ttl ? Date.now() + ttl : null;
    this.store.set(key, { value, expiresAt });
  }

  get<T = any>(key: string): T | null {
    const entry = this.store.get(key);
    if (!entry) return null;

    if (entry.expiresAt && entry.expiresAt < Date.now()) {
      this.store.delete(key);
      return null;
    }

    return entry.value as T;
  }

  delete(key: string) {
    this.store.delete(key);
  }

  has(key: string): boolean {
    const entry = this.store.get(key);
    if (!entry) return false;

    if (entry.expiresAt && entry.expiresAt < Date.now()) {
      this.store.delete(key);
      return false;
    }

    return true;
  }

  clear() {
    this.store.clear();
  }

  keys() {
    return [...this.store.keys()];
  }

  size() {
    return this.store.size;
  }
}

export function createGICacheEngine() {
  return new GI_CacheEngine();
}

