import {
  MessengerActivityPort,
  MessengerChatStorePort,
  MessengerMessageStorePort,
  MessengerNotificationPort,
  MessengerRealtimePort,
  MessengerUnreadStorePort,
  SendMessengerMessageInput,
} from "../../../../core/kernel"

type SendMessageCommand = SendMessengerMessageInput & {
  notifyParticipants?: boolean
  updateUnread?: boolean
  emitRealtime?: boolean
}

export class MessengerOrchestratorService {
  constructor(
    private readonly chats: MessengerChatStorePort,
    private readonly messages: MessengerMessageStorePort,
    private readonly unread: MessengerUnreadStorePort,
    private readonly realtime: MessengerRealtimePort,
    private readonly notifications: MessengerNotificationPort,
    private readonly activity: MessengerActivityPort,
  ) {}

  async sendMessage(command: SendMessageCommand) {
    const chat = await this.chats.getChatById(command.chatId)

    if (!chat) {
      throw new Error(`Chat not found: ${command.chatId}`)
    }

    const message = await this.messages.createMessage(command)

    if (command.updateUnread !== false) {
      await this.unread.incrementUnread(command.chatId, command.senderUserId)
    }

    if (command.emitRealtime !== false) {
      await this.realtime.emitToChat(command.chatId, "message:new", {
        type: "message.created",
        chatId: command.chatId,
        messageId: message.id,
        actorUserId: command.senderUserId,
        data: {
          type: message.type,
          text: message.text ?? null,
          createdAt: message.createdAt.toISOString(),
        },
      })
    }

    for (const participant of chat.participants) {
      if (participant.userId === command.senderUserId) continue

      if (command.notifyParticipants !== false) {
        await this.notifications.notify({
          recipientUserId: participant.userId,
          actorUserId: command.senderUserId,
          chatId: command.chatId,
          messageId: message.id,
          type: "messenger.message.created",
          title: "New message",
          body: message.text ?? "New media message",
          data: {
            chatId: command.chatId,
            messageId: message.id,
            messageType: message.type,
          },
        })
      }

      await this.activity.write({
        userId: participant.userId,
        actorUserId: command.senderUserId,
        chatId: command.chatId,
        messageId: message.id,
        type: "messenger.message.created",
        data: {
          messageType: message.type,
        },
      })
    }

    return message
  }

  async markRead(chatId: string, userId: string, lastReadMessageId?: string | null) {
    const unreadState = await this.unread.resetUnread(chatId, userId, lastReadMessageId ?? null)

    await this.realtime.emitToChat(chatId, "message:read", {
      type: "message.read",
      chatId,
      actorUserId: userId,
      messageId: lastReadMessageId ?? undefined,
      data: {
        unreadCount: unreadState.unreadCount,
        lastReadMessageId: unreadState.lastReadMessageId ?? null,
      },
    })

    await this.activity.write({
      userId,
      actorUserId: userId,
      chatId,
      messageId: lastReadMessageId ?? null,
      type: "messenger.message.read",
      data: {
        unreadCount: unreadState.unreadCount,
      },
    })

    return unreadState
  }
}
