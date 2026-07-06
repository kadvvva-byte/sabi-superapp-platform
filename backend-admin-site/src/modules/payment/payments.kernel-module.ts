import { SuperAppModule } from "../../core/kernel/module.interface"

export class PaymentsKernelModule implements SuperAppModule {

  name = "PaymentsModule"

  async init() {

    console.log("Payments module initialized")

  }

}