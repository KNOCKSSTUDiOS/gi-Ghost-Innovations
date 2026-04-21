import fs from "fs";
import path from "path";

export type GILogLevel = "debug" | "info" | "warn" | "error" | "fatal";

export interface GILogEntry {
  id: string;
  level: GILogLevel;
  message: string;
  data?: any;
  timestamp: number;
}

export interface GILoggerSink {
  write(entry: GILogEntry): void;
}

export class GI_ConsoleSink implements GILoggerSink {
  write(entry: GILogEntry) {
    const ts = new Date(entry.timestamp).toISOString();
    const base = `[${ts}] [${entry.level.toUpperCase()}] ${entry.message}`;
    if (entry.data) {
      console.log(base, entry.data);
    } else {
      console.log(base);
    }
  }
}

export class GI_FileSink implements GILoggerSink {
  private filePath: string;

  constructor(filePath: string) {
    this.filePath = filePath;
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  }

  write(entry: GILogEntry) {
    const ts = new Date(entry.timestamp).toISOString();
    const line = JSON.stringify({
      timestamp: ts,
      level: entry.level,
      message: entry.message,
      data: entry.data ?? null
    }) + "\n";

    fs.appendFileSync(this.filePath, line, "utf8");
  }
}

export class GI_LoggerEngine {
  private sinks: GILoggerSink[] = [];
  private history: GILogEntry[] = [];
  private maxHistory: number;

  constructor(maxHistory: number = 500) {
    this.maxHistory = maxHistory;
  }

  addSink(sink: GILoggerSink) {
    this.sinks.push(sink);
  }

  private push(entry: GILogEntry) {
    this.history.push(entry);
    if (this.history.length > this.maxHistory) {
      this.history.shift();
    }

    for (const sink of this.sinks) {
      try {
        sink.write(entry);
      } catch {
        // sinks must never break the logger
      }
    }
  }

  private log(level: GILogLevel, message: string, data?: any) {
    const entry: GILogEntry = {
      id: crypto.randomUUID(),
      level,
      message,
      data,
      timestamp: Date.now()
    };

    this.push(entry);
  }

  debug(msg: string, data?: any) {
    this.log("debug", msg, data);
  }

  info(msg: string, data?: any) {
    this.log("info", msg, data);
  }

  warn(msg: string, data?: any) {
    this.log("warn", msg, data);
  }

  error(msg: string, data?: any) {
    this.log("error", msg, data);
  }

  fatal(msg: string, data?: any) {
    this.log("fatal", msg, data);
  }

  getHistory() {
    return [...this.history];
  }

  clearHistory() {
    this.history = [];
  }
}

import crypto from "crypto";

export function createGILoggerEngine(maxHistory?: number) {
  return new GI_LoggerEngine(maxHistory);
}

