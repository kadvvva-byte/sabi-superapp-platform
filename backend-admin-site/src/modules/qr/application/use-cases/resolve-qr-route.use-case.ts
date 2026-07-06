import {
  QrRouteResolverService,
  type ResolveQrRouteOutput,
} from "../services/qr-route-resolver.service";

export type ResolveQrRouteInput = {
  rawPayload: string | Record<string, unknown>;
};

export class ResolveQrRouteUseCase {
  constructor(private readonly resolverService: QrRouteResolverService) {}

  async execute(input: ResolveQrRouteInput): Promise<ResolveQrRouteOutput> {
    return this.resolverService.resolve(input.rawPayload);
  }
}
