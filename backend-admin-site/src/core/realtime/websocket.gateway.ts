import {
  OnGatewayInit,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import { Server } from "socket.io";

import { configureRealtimeEmitter } from "./realtime.emitter";

/**
 * Legacy websocket bootstrap bridge.
 *
 * Этот gateway больше не держит messenger/business logic:
 * - не управляет presence
 * - не управляет typing
 * - не управляет calls/messages/reactions
 *
 * Его единственная задача — дать kernel/shared realtime emitter доступ
 * к текущему socket.io server instance.
 *
 * Вся доменная realtime логика должна жить:
 * - либо в kernel/module composition
 * - либо в domain-specific gateway/service слоях
 * но не здесь.
 */
@WebSocketGateway({
  cors: {
    origin: "*",
  },
})
export class WebSocketGatewayClass implements OnGatewayInit {
  @WebSocketServer()
  server!: Server;

  afterInit(server: Server) {
    configureRealtimeEmitter(server);
  }
}