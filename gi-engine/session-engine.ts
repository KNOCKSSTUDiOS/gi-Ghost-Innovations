import crypto from "crypto";
import { GI_CachePersistEngine } from "./cache-persist-engine";

export interface GISessionData {
  id: string;
  userId?: string;
  createdAt: number;
  updatedAt: number;
  expiresAt: number | null;
  data: Record<string, any>;
}

export interface GISessionConfig {
  ttl?: number;
  namespace?: string;
}

export class GI_SessionEngine {
  private store: GI_CachePersistEngine;
  private ttl: number;

  constructor(store: GI_CachePersistEngine, config: GISessionConfig = {}) {
    this.store = store;
    this.ttl = config.ttl ?? 1000 * 60 * 60 * 24; // 24h
  }

  private key(id: string) {
    return `session:${id}`;
  }

  create(userId?: string): GISessionData {
    const id = crypto.randomUUID();
    const now = Date.now();
    const session: GISessionData = {
      id,
      userId,
      createdAt: now,
      updatedAt: now,
      expiresAt: now + this.ttl,
      data: {}
    };

    this.store.set(this.key(id), session, this.ttl);
    return session;
  }

  get(id: string): GISessionData | null {
    const session = this.store.get<GISessionData>(this.key(id));
    if (!session) return null;
    if (session.expiresAt && session.expiresAt < Date.now()) {
      this.destroy(id);
      return null;
    }
    return session;
  }

  touch(id: string) {
    const session = this.get(id);
    if (!session) return null;
    session.updatedAt = Date.now();
    session.expiresAt = Date.now() + this.ttl;
    this.store.set(this.key(id), session, this.ttl);
    return session;
  }

  setData(id: string, key: string, value: any) {
    const session = this.get(id);
    if (!session) return null;
    session.data[key] = value;
    session.updatedAt = Date.now();
    this.store.set(this.key(id), session, this.ttl);
    return session;
  }

  getData<T = any>(id: string, key: string): T | null {
    const session = this.get(id);
    if (!session) return null;
    return (session.data[key] as T) ?? null;
  }

  destroy(id: string) {
    this.store.delete(this.key(id));
  }
}

export function createGISessionEngine(store: GI_CachePersistEngine, config?: GISessionConfig) {
  return new GI_SessionEngine(store, config);
}
