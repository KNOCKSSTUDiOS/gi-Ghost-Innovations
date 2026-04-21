import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function resolveRoot(...segments) {
  return path.resolve(__dirname, "..", "..", ...segments);
}

export function joinSafe(...segments) {
  return path.join(...segments).replace(/\\/g, "/");
}
