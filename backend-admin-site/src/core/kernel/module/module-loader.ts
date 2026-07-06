import { SuperAppModule } from "./module.interface"
import { ModuleRegistry } from "./module-registry"

export class ModuleLoader {
  constructor(private readonly registry: ModuleRegistry) {}

  load(modules: readonly SuperAppModule[]) {
    for (const module of modules) {
      this.registry.register(module)
    }
  }

  async bootstrap() {
    await this.registry.initAll()
  }

  async start() {
    await this.registry.startAll()
  }

  async stop() {
    await this.registry.stopAll()
  }
}