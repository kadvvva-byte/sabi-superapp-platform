export interface QrStoredEvent {
  id: string;
  type: string;
  operationId?: string;
  payload: Record<string, unknown>;
  createdAt: string;
}

export interface QrEventRepository {
  append(event: QrStoredEvent): Promise<void>;
}
