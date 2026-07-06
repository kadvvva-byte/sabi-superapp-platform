export interface PaymentProviderWebhookEvent {
  eventId: string
  providerPaymentId: string
  provider: string
  type: string
  amount?: number
  currency?: string
  metadata?: Record<string, any>
  raw: any
}
      