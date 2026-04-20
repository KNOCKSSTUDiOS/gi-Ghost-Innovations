import { selectModel } from "../gi-core/core-routing-hook";
import { GiLanguageOperation } from "./schema";

export async function runLanguageOp(
  user_id: string,
  type: GiLanguageOperation["type"],
  input: string,
  metadata?: any
) {
  const model = selectModel(user_id, "language_op");

  return {
    id: "lang-" + Math.random().toString(36).substring(2, 10),
    type,
    input,
    output: `AUTO-${type.toUpperCase()}: Processed "${input}"`,
    metadata,
    model: model.model,
    created: Date.now()
  };
}

