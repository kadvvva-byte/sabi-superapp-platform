import { PipelineContext } from "./pipeline-context"

export interface PipelineStep {

  execute(context: PipelineContext): Promise<void>

}