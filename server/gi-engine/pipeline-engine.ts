import crypto from "crypto";

export interface GIPipelineStageContext {
  id: string;
  pipeline: string;
  stage: string;
  index: number;
  input: any;
  output: any;
  startedAt: number;
  endedAt?: number;
  error?: string;
}

export type GIPipelineStageHandler = (
  ctx: GIPipelineStageContext
) => Promise<any> | any;

export interface GIPipelineDefinition {
  name: string;
  stages: { name: string; handler: GIPipelineStageHandler }[];
}

export interface GIPipelineResult {
  id: string;
  pipeline: string;
  success: boolean;
  stages: GIPipelineStageContext[];
  startedAt: number;
  endedAt: number;
}

export class GI_PipelineEngine {
  private pipelines: Map<string, GIPipelineDefinition>;

  constructor() {
    this.pipelines = new Map();
  }

  // -----------------------------
  // REGISTER PIPELINE
  // -----------------------------
  register(def: GIPipelineDefinition) {
    this.pipelines.set(def.name, def);
  }

  unregister(name: string) {
    this.pipelines.delete(name);
  }

  list() {
    return [...this.pipelines.keys()];
  }

  // -----------------------------
  // RUN PIPELINE
  // -----------------------------
  async run(pipelineName: string, input: any): Promise<GIPipelineResult> {
    const def = this.pipelines.get(pipelineName);
    if (!def) {
      throw new Error(`Pipeline not found: ${pipelineName}`);
    }

    const id = crypto.randomUUID();
    const startedAt = Date.now();
    const stages: GIPipelineStageContext[] = [];

    let currentInput = input;

    for (let i = 0; i < def.stages.length; i++) {
      const stageDef = def.stages[i];

      const ctx: GIPipelineStageContext = {
        id: crypto.randomUUID(),
        pipeline: pipelineName,
        stage: stageDef.name,
        index: i,
        input: currentInput,
        output: null,
        startedAt: Date.now()
      };

      try {
        const result = stageDef.handler(ctx);
        ctx.output = result instanceof Promise ? await result : result;
        ctx.endedAt = Date.now();
        stages.push(ctx);

        currentInput = ctx.output;
      } catch (err: any) {
        ctx.error = err?.message || "Unknown error";
        ctx.endedAt = Date.now();
        stages.push(ctx);

        return {
          id,
          pipeline: pipelineName,
          success: false,
          stages,
          startedAt,
          endedAt: Date.now()
        };
      }
    }

    return {
      id,
      pipeline: pipelineName,
      success: true,
      stages,
      startedAt,
      endedAt: Date.now()
    };
  }
}

export function createGIPipelineEngine() {
  return new GI_PipelineEngine();
}
