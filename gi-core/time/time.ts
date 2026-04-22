export class Time {
  now(): number {
    return Date.now();
  }

  ms(seconds: number): number {
    return seconds * 1000;
  }

  delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  interval(ms: number, fn: () => void) {
    const id = setInterval(fn, ms);
    return () => clearInterval(id);
  }
}

