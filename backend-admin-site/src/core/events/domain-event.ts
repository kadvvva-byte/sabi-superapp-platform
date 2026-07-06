import { randomUUID } from "crypto"

export interface DomainEvent {
  id: string
  type: string
  aggregateId: string
  payload: any
  occurredAt: Date
}

export function createEvent(
  type: string,
  aggregateId: string,
  payload: any
): DomainEvent {

  return {
    id: randomUUID(),
    type,
    aggregateId,
    payload,
    occurredAt: new Date()
  }

}