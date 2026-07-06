export interface QrRouteResolvedEvent {
  type: "qr.route_resolved";
  operationId: string;
  routeKey: string;
  executionKey: string;
  createdAt: string;
}
