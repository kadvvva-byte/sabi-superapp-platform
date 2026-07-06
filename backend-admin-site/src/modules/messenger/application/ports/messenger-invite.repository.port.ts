import { MessengerInviteEntity } from "../../domain/entities/messenger-invite.entity"

export interface MessengerInviteRepositoryPort {
  save(invite: MessengerInviteEntity): Promise<MessengerInviteEntity>
  findById(id: string): Promise<MessengerInviteEntity | null>
  findByCode(code: string): Promise<MessengerInviteEntity | null>
  listByRoom(roomId: string): Promise<MessengerInviteEntity[]>
}