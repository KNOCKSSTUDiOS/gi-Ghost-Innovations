import { promises as fs } from "fs";
import { dirname } from "path";

export class FileSystem {
  async read(path: string): Promise<string> {
    return fs.readFile(path, "utf8");
  }

  async write(path: string, data: string): Promise<void> {
    await this.ensureDir(dirname(path));
    await fs.writeFile(path, data, "utf8");
  }

  async exists(path: string): Promise<boolean> {
    try {
      await fs.access(path);
      return true;
    } catch {
      return false;
    }
  }

  async ensureDir(path: string): Promise<void> {
    await fs.mkdir(path, { recursive: true });
  }
}
