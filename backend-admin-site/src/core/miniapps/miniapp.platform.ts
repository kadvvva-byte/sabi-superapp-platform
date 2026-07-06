import { MiniAppRegistry } from "./miniapp-registry"
import { MiniApp } from "./miniapp.interface"

export class MiniAppPlatform {

  private registry = new MiniAppRegistry()

  register(app: MiniApp) {

    this.registry.register(app)

  }

  getApps() {

    return this.registry.getApps()

  }

}