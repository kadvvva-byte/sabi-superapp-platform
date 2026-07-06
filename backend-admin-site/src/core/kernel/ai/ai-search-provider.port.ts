import {
  type AiProviderKey,
  type AiProviderStatus,
  type AiSearchProviderManifestItem,
  type AiSearchRequest,
  type AiSearchResponse,
  type AiSearchVertical,
} from "./ai.types"

export interface AiSearchProviderPort {
  readonly key: AiProviderKey
  readonly label: string
  readonly supportedVerticals: AiSearchVertical[]
  readonly requiresGateway: boolean
  getStatus(): AiProviderStatus
  canSearch(vertical: AiSearchVertical): boolean
  search(request: AiSearchRequest): Promise<AiSearchResponse>
  getManifestItem(): AiSearchProviderManifestItem
}
