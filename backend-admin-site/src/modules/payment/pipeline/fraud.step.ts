import { PipelineStep } from "../../../core/pipeline/pipeline-step.interface"
import { PipelineContext } from "../../../core/pipeline/pipeline-context"

export class FraudStep implements PipelineStep {

  async execute(context: PipelineContext) {

    console.log("Fraud check...")

  }

}