import { walletService } from "../wallet.service"
import { walletProviderExecutionGuard } from "../provider/wallet-provider-execution.guard"

export class PayQrUseCase {

  execute(
    payerWalletId: string,
    receiverWalletId: string,
    amount: number
  ) {

    walletProviderExecutionGuard.assertProviderReady({
      route: "qr_wallet_payment",
      providerId: "alipay_plus_acquiring",
    })

    walletService.transfer(
      payerWalletId,
      receiverWalletId,
      amount
    )

    return {
      status: "QR_PAYMENT_SUCCESS",
      providerExecutionGuard: "ready"
    }

  }

}