import { MessengerBotEntity } from "../../domain/entities/messenger-bot.entity"

export interface MessengerBotRepositoryPort {
  save(bot: MessengerBotEntity): Promise<MessengerBotEntity>
  findById(id: string): Promise<MessengerBotEntity | null>
  findByUsername(username: string): Promise<MessengerBotEntity | null>
  listByOwner(ownerUserId: string): Promise<MessengerBotEntity[]>
}