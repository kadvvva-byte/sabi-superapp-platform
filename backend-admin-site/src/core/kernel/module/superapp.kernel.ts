import { ModuleLoader } from "./module-loader"
import { SuperAppModule } from "./module.interface"
import { ModuleRegistry } from "./module-registry"

export class SuperAppKernel {
  private readonly registry = new ModuleRegistry()
  private readonly loader = new ModuleLoader(this.registry)

  private bootstrapped = false
  private started = false

  register(module: SuperAppModule) {
    if (this.bootstrapped) {
      throw new Error(
        `Cannot register module "${module.name}" after kernel bootstrap`,
      )
    }

    this.registry.register(module)
  }

  registerMany(modules: readonly SuperAppModule[]) {
    if (this.bootstrapped) {
      throw new Error("Cannot register modules after kernel bootstrap")
    }

    this.loader.load(modules)
  }

  hasModule(name: string) {
    return this.registry.has(name)
  }

  getModule(name: string) {
    return this.registry.get(name)
  }

  listModules() {
    return this.registry.list()
  }

  async bootstrap() {
    if (this.bootstrapped) return

    await this.loader.bootstrap()
    this.bootstrapped = true

    console.log("Super App Kernel bootstrapped")
  }

  async start() {
    if (this.started) return

    await this.bootstrap()
    await this.loader.start()

    this.started = true
    console.log("Super App Kernel started")
  }

  async stop() {
    if (!this.bootstrapped) return

    await this.loader.stop()
    this.started = false

    console.log("Super App Kernel stopped")
  }
}