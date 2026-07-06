export type ChatType =
  | "PRIVATE"
  | "GROUP"
  | "CHANNEL"

export interface Chat {

  id: string

  type: ChatType

  title?: string

  createdAt: Date

}