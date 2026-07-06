import { MiniApp } from "../miniapp.interface"

export class MarketplaceMiniApp implements MiniApp {

  name = "Marketplace"

  icon = "marketplace"

  url = "/miniapps/marketplace"

  async init(): Promise<void> {
    console.log("Marketplace MiniApp initialized")
  }

}