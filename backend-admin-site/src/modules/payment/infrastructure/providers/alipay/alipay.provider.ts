export class AlipayProvider {

  async capture(): Promise<void> {
    console.log("Alipay capture")
  }

  async refund(): Promise<void> {
    console.log("Alipay refund")
  }

}