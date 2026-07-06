import { PipelineStep } from "../../../core/pipeline/pipeline-step.interface"
import { PipelineContext } from "../../../core/pipeline/pipeline-context"

export class ValidationStep implements PipelineStep {

  async execute(context: PipelineContext) {

    const { request } = context

    if (!request.amount || request.amount <= 0) {

      throw new Error("Invalid amount")

    }

  }

}