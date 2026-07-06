import { SuperAppModule } from "./module.interface"

export class ModuleRegistry {
  private readonly modules = new Map<string, SuperAppModule>()
  private readonly initialized = new Set<string>()
  private readonly started = new Set<string>()

  register(module: SuperAppModule) {
    if (!module || typeof module.name !== "string" || !module.name.trim()) {
      throw new Error("Module name is required")
    }

    if (this.modules.has(module.name)) {
      throw new Error(`Module already registered: ${module.name}`)
    }

    this.modules.set(module.name, module)
  }

  has(name: string) {
    return this.modules.has(name)
  }

  get(name: string) {
    return this.modules.get(name)
  }

  list() {
    return Array.from(this.modules.values())
  }

  private resolveDependencyOrder(): SuperAppModule[] {
    const ordered: SuperAppModule[] = []
    const visiting = new Set<string>()
    const visited = new Set<string>()

    const visit = (moduleName: string) => {
      if (visited.has(moduleName)) return

      if (visiting.has(moduleName)) {
        throw new Error(`Circular module dependency detected: ${moduleName}`)
      }

      const module = this.modules.get(moduleName)
      if (!module) {
        throw new Error(`Module dependency not found: ${moduleName}`)
      }

      visiting.add(moduleName)

      for (const dependency of module.dependsOn ?? []) {
        if (!this.modules.has(dependency)) {
          throw new Error(
            `Module "${module.name}" depends on missing module "${dependency}"`,
          )
        }

        visit(dependency)
      }

      visiting.delete(moduleName)
      visited.add(moduleName)
      ordered.push(module)
    }

    for (const module of this.modules.values()) {
      visit(module.name)
    }

    return ordered
  }

  async initAll() {
    const ordered = this.resolveDependencyOrder()

    for (const module of ordered) {
      if (this.initialized.has(module.name)) continue

      await module.init()
      this.initialized.add(module.name)

      console.log(`Module initialized: ${module.name}`)
    }
  }

  async startAll() {
    const ordered = this.resolveDependencyOrder()

    for (const module of ordered) {
      if (this.started.has(module.name)) continue

      if (typeof module.start === "function") {
        await module.start()
      }

      this.started.add(module.name)
      console.log(`Module started: ${module.name}`)
    }
  }

  async stopAll() {
    const ordered = this.resolveDependencyOrder().reverse()

    for (const module of ordered) {
      if (!this.started.has(module.name)) continue

      if (typeof module.stop === "function") {
        await module.stop()
      }

      this.started.delete(module.name)
      console.log(`Module stopped: ${module.name}`)
    }
  }
}