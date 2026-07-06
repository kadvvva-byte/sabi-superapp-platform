import {
  type AiProviderKey,
  type AiProviderStatus,
  type AiTranslationContentType,
  type AiTranslationProviderManifestItem,
  type AiTranslationRequest,
  type AiTranslationResponse,
} from "./ai.types"

export interface AiTranslationProviderPort {
  readonly key: AiProviderKey
  readonly label: string
  readonly requiresGateway: boolean
  readonly supportedContentTypes: AiTranslationContentType[]

  getStatus(): AiProviderStatus
  canTranslate(contentType: AiTranslationContentType): boolean
  translate(request: AiTranslationRequest): Promise<AiTranslationResponse>
  getManifestItem(): AiTranslationProviderManifestItem
}
