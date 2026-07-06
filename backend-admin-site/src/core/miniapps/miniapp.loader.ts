import { MiniAppPlatform } from "./miniapp.platform"
import { MarketplaceMiniApp } from "./marketplace/marketplace.miniapp"

export function loadMiniApps(platform: MiniAppPlatform) {

  platform.register(new MarketplaceMiniApp())

}