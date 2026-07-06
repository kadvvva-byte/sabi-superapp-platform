import { MessengerRoomEntity } from "../../domain/entities/messenger-room.entity"

export interface MessengerRoomRepositoryPort {
  save(room: MessengerRoomEntity): Promise<MessengerRoomEntity>
  findById(id: string): Promise<MessengerRoomEntity | null>
  findByUsername(username: string): Promise<MessengerRoomEntity | null>
  listByCreator(createdByUserId: string): Promise<MessengerRoomEntity[]>
}