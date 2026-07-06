export class QRParserService {

  parse(qrData: string) {

    const url = new URL(qrData)

    return {
      walletId: url.searchParams.get("to"),
      amount: url.searchParams.get("amount"),
      currency: url.searchParams.get("currency")
    }

  }

}