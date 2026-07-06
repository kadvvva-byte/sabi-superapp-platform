import type { MessengerBotRepositoryPort } from "../ports/messenger-bot.repository.port"

export class MessengerBotQueryService {
  constructor(
    private readonly botRepository: MessengerBotRepositoryPort,
  ) {}

  async listOwnerBots(ownerUserId: string) {
    return this.botRepository.listByOwner(ownerUserId)
  }

  async getBotById(botId: string) {
    const bot = await this.botRepository.findById(botId)

    if (!bot) {
      throw new Error("messenger_bot_not_found")
    }

    return bot
  }
}