export interface CreateGroupDTO {
  title: string
  creatorId: string
  memberIds?: string[]
}

export interface AddMemberDTO {
  chatId: string
  userId: string
}

export interface RemoveMemberDTO {
  chatId: string
  userId: string
}