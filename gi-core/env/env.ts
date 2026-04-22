export class Env {
  private values: Record<string, string> = {};

  load(source: Record<string, string | undefined>) {
    for (const key in source) {
      const val = source[key];
      if (typeof val === "string") {
        this.values[key] = val;
      }
    }
  }

  get(key: string, fallback: string = ""): string {
    return this.values[key] ?? fallback;
  }

  require(key: string): string {
    const val = this.values[key];
    if (!val) {
      throw new Error(`Missing environment variable: ${key}`);
    }
    return val;
  }
}

