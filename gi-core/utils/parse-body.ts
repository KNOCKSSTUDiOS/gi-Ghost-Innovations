import { IncomingMessage } from "http";

export function parseBody(req: IncomingMessage): Promise<any> {
  return new Promise((resolve, reject) => {
    let body = "";

    req.on("data", chunk => {
      body += chunk;
    });

    req.on("end", () => {
      if (!body) {
        resolve({});
        return;
      }

      try {
        const data = JSON.parse(body);
        resolve(data);
      } catch {
        reject(new Error("invalid_json"));
      }
    });

    req.on("error", () => {
      reject(new Error("read_error"));
    });
  });
}

