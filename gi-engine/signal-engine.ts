import crypto from "crypto";

export interface GISignalSubscriber<T = any> {
  id: string;
  fn: (value: T) => void;
  createdAt: number;
}

export class GI_Signal<T = any> {
  private value: T;
  private subscribers: Map<string, GISignalSubscriber<T>>;

  constructor(initial: T) {
    this.value = initial;
    this.subscribers = new Map();
  }

  get(): T {
    return this.value;
  }

  set(v: T) {
    this.value = v;
    this.emit(v);
  }

  update(fn: (prev: T) => T) {
    this.value = fn(this.value);
    this.emit(this.value);
  }

  subscribe(fn: (value: T) => void): GISignalSubscriber<T> {
    const sub: GISignalSubscriber<T> = {
      id: crypto.randomUUID(),
      fn,
      createdAt: Date.now()
    };

    this.subscribers.set(sub.id, sub);
    return sub;
  }

  unsubscribe(id: string) {
    this.subscribers.delete(id);
  }

  private emit(v: T) {
    for (const sub of this.subscribers.values()) {
      try {
        sub.fn(v);
      } catch {
        // signals must never break the engine
      }
    }
  }
}

export class GI_ComputedSignal<T = any> {
  private computeFn: () => T;
  private value: T;
  private subscribers: Map<string, GISignalSubscriber<T>>;

  constructor(computeFn: () => T) {
    this.computeFn = computeFn;
    this.value = computeFn();
    this.subscribers = new Map();
  }

  get(): T {
    return this.value;
  }

  recompute() {
    this.value = this.computeFn();
    this.emit(this.value);
  }

  subscribe(fn: (value: T) => void): GISignalSubscriber<T> {
    const sub: GISignalSubscriber<T> = {
      id: crypto.randomUUID(),
      fn,
      createdAt: Date.now()
    };

    this.subscribers.set(sub.id, sub);
    return sub;
  }

  unsubscribe(id: string) {
    this.subscribers.delete(id);
  }

  private emit(v: T) {
    for (const sub of this.subscribers.values()) {
      try {
        sub.fn(v);
      } catch {
        // computed signals must never break the engine
      }
    }
  }
}

export function createGISignal<T>(initial: T) {
  return new GI_Signal<T>(initial);
}

export function createGIComputedSignal<T>(computeFn: () => T) {
  return new GI_ComputedSignal<T>(computeFn);
}

