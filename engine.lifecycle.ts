export class EngineLifecycle {
  private initHandlers: Array<() => void | Promise<void>> = [];
  private readyHandlers: Array<() => void | Promise<void>> = [];
  private shutdownHandlers: Array<() => void | Promise<void>> = [];

  onInit(handler: () => void | Promise<void>) {
    this.initHandlers.push(handler);
  }

  onReady(handler: () => void | Promise<void>) {
    this.readyHandlers.push(handler);
  }

  onShutdown(handler: () => void | Promise<void>) {
    this.shutdownHandlers.push(handler);
  }

  async runInit() {
    for (const h of this.initHandlers) {
      await h();
    }
  }

  async runReady() {
    for (const h of this.readyHandlers) {
      await h();
    }
  }

  async runShutdown() {
    for (const h of this.shutdownHandlers) {
      await h();
    }
  }
}

