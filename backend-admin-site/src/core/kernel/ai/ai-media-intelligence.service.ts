import type { AiSearchMediaType, AiSearchResponse, AiSearchResultItem, AiSearchVertical } from "./ai.types"

type AiMediaSearchKind = "image" | "video" | "music" | "file"

const MEDIA_TO_VERTICAL: Record<AiMediaSearchKind, AiSearchVertical> = {
  image: "images",
  video: "video",
  music: "music",
  file: "files",
}

const MEDIA_TO_TYPE: Record<AiMediaSearchKind, AiSearchMediaType> = {
  image: "image",
  video: "video",
  music: "audio",
  file: "file",
}

export class AiMediaIntelligenceService {
  buildMediaSearchRequest(input: {
    userId: string
    query: string
    kind: AiMediaSearchKind
    locale?: string
    preferredProvider?: "internal" | "google" | "yandex"
    allowFallback?: boolean
  }) {
    return {
      userId: input.userId,
      query: input.query,
      locale: input.locale,
      preferredProvider: input.preferredProvider,
      vertical: MEDIA_TO_VERTICAL[input.kind],
      allowFallback: input.allowFallback ?? true,
    }
  }

  decorateMediaResult(input: {
    kind: AiMediaSearchKind
    response: AiSearchResponse
  }): AiSearchResponse {
    const expectedType = MEDIA_TO_TYPE[input.kind]
    const results: AiSearchResultItem[] = input.response.results.map((item) => ({
      ...item,
      mediaType: item.mediaType ?? expectedType,
    }))

    return {
      ...input.response,
      results,
      note:
        input.response.note ??
        (input.kind === "music"
          ? "AI media intelligence prepared audio results for the media player flow."
          : input.kind === "video"
            ? "AI media intelligence prepared video results for the video flow."
            : input.kind === "image"
              ? "AI media intelligence prepared image results for preview."
              : "AI media intelligence prepared file results for document preview."),
    }
  }
}
