import { SuperAppModule } from "../../core/kernel/module.interface"

export class MediaKernelModule implements SuperAppModule {
  readonly name = "media"

  async init(): Promise<void> {
    console.log("[kernel] media module initialized")
  }

  async start(): Promise<void> {
    console.log("[kernel] media module started")
  }

  async stop(): Promise<void> {
    console.log("[kernel] media module stopped")
  }
}