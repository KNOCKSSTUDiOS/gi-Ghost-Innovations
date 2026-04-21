export class Access {
  private sessions: Map<string, string>;

  constructor() {
    this.sessions = new Map();
  }

  createSession(userId: string) {
    const token = Math.random().toString(36).slice(2);
    this.sessions.set(token, userId);
    return token;
  }

  getUser(token: string) {
    return this.sessions.get(token) || null;
  }

  endSession(token: string) {
    this.sessions.delete(token);
  }

  clear() {
    this.sessions.clear();
  }
}

