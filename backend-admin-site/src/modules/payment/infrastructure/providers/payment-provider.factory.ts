import { parseAlipayWebhookPayload } from "../webhooks/alipay-webhook.handler";
import { parseStripeWebhookPayload } from "../webhooks/stripe-webhook.handler";
import type { ProviderWebhookDto } from "../webhooks/provider-webhook.dto";

type ProviderWebhookParser = (payload: unknown) => ProviderWebhookDto | Promise<ProviderWebhookDto>;

export class PaymentProviderFactory {
  static getWebhookHandler(provider: string): ProviderWebhookParser {
    switch (provider.toLowerCase()) {
      case "alipay":
        return parseAlipayWebhookPayload;
      case "stripe":
        return parseStripeWebhookPayload;
      default:
        throw new Error(`Unsupported provider: ${provider}`);
    }
  }
}
