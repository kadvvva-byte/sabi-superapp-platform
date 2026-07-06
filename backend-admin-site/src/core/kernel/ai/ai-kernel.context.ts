import { AiFacadeService } from "./ai-facade.service"
import { AiPersistenceService } from "./ai-persistence.service"

export function createAiKernelContext() {
  const persistence = new AiPersistenceService()
  const facade = new AiFacadeService({ persistenceService: persistence })

  return {
    persistence,
    facade,
  }
}

export type AiKernelContext = ReturnType<typeof createAiKernelContext>
export const aiKernelContext = createAiKernelContext()
