import { SuperAppModule } from "./module.interface"
import { SuperAppKernel } from "./superapp.kernel"

export async function bootstrapKernel(modules: readonly SuperAppModule[]) {
  const kernel = new SuperAppKernel()

  kernel.registerMany(modules)
  await kernel.start()

  return kernel
}