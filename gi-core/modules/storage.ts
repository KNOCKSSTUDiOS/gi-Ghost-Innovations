export class Storage {
  private data: Map<string, any>;

  constructor() {
    this.data = new Map();
  }

  get(key: string) {
    return this.data.get(key);
  }

  set(key: string, value: any) {
    this.data.set(key, value);
  }

  delete(key: string) {
    this.data.delete(key);
  }

  has(key: string) {
    return this.data.has(key);
  }

  clear() {
    this.data.clear();
  }

  all() {
    const result: Record<string, any> = {};
    for (const [key, value] of this.data.entries()) {
      result[key] = value;
    }
    return result;
  }
}

