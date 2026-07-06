import type { MessengerRoomRepositoryPort } from "../ports/messenger-room.repository.port"
import type { MessengerMemberRepositoryPort } from "../ports/messenger-member.repository.port"
import type { MessengerRoomKind } from "../../domain/types/messenger-room-kind"

export class MessengerRoomQueryService {
  constructor(
    private readonly roomRepository: MessengerRoomRepositoryPort,
    private readonly memberRepository: MessengerMemberRepositoryPort,
  ) {}

  async getRoomDetails(roomId: string) {
    const room = await this.roomRepository.findById(roomId)

    if (!room) {
      throw new Error("messenger_room_not_found")
    }

    return room
  }

  async listRoomMembers(roomId: string) {
    const room = await this.roomRepository.findById(roomId)

    if (!room) {
      throw new Error("messenger_room_not_found")
    }

    return this.memberRepository.listByRoom(roomId)
  }

  async listCreatorRooms(createdByUserId: string) {
    return this.roomRepository.listByCreator(createdByUserId)
  }

  async listCreatorRoomsByKind(
    createdByUserId: string,
    kind: MessengerRoomKind,
  ) {
    const rooms = await this.roomRepository.listByCreator(createdByUserId)
    return rooms.filter((room) => room.kind === kind)
  }
}