import { PipelineStep } from "./pipeline-step.interface"
import { PipelineContext } from "./pipeline-context"

export class PipelineEngine {

  private steps: PipelineStep[] = []

  addStep(step: PipelineStep) {

    this.steps.push(step)

  }

  async execute(context: PipelineContext) {

    for (const step of this.steps) {

      await step.execute(context)

    }

    return context.result

  }

}