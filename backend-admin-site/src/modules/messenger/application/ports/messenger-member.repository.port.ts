import { MessengerMemberEntity } from "../../domain/entities/messenger-member.entity"

export interface MessengerMemberRepositoryPort {
  save(member: MessengerMemberEntity): Promise<MessengerMemberEntity>
  findById(id: string): Promise<MessengerMemberEntity | null>
  findByRoomAndUser(
    roomId: string,
    userId: string,
  ): Promise<MessengerMemberEntity | null>
  listByRoom(roomId: string): Promise<MessengerMemberEntity[]>
  deleteByRoomAndUser(roomId: string, userId: string): Promise<void>
}