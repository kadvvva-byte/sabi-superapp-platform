import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket
} from "@nestjs/websockets"

import { Server, Socket } from "socket.io"

@WebSocketGateway({
  cors: { origin: "*" }
})
export class WsGateway {

  @WebSocketServer()
  server: Server

  //////////////////////////////////////////////////////
  // CONNECT
  //////////////////////////////////////////////////////

  handleConnection(client: Socket) {
    console.log("User connected:", client.id)
  }

  handleDisconnect(client: Socket) {
    console.log("User disconnected:", client.id)
  }

  //////////////////////////////////////////////////////
  // JOIN CHAT
  //////////////////////////////////////////////////////

  @SubscribeMessage("chat:join")
  joinChat(
    @MessageBody() data: { chatId: string },
    @ConnectedSocket() client: Socket
  ) {

    client.join(data.chatId)

  }

  //////////////////////////////////////////////////////
  // TYPING
  //////////////////////////////////////////////////////

  @SubscribeMessage("typing")
  typing(
    @MessageBody() data: {
      chatId: string
      userId: string
      isTyping: boolean
    }
  ) {

    this.server.to(data.chatId).emit("typing", data)

  }

}