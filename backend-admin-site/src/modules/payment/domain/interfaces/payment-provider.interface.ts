export interface PaymentProviderWebhookEvent {
  eventId: string
  provider: string
  providerPaymentId: string
  type: string
  amount?: number
  raw: any
}

export interface PaymentProvider {
  verifyAndParseWebhook(
    rawBody: Buffer,
    headers: any
  ): PaymentProviderWebhookEvent
}