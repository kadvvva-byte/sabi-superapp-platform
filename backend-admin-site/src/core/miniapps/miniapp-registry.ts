import { MiniApp } from "./miniapp.interface"

export class MiniAppRegistry {

  private apps: MiniApp[] = []

  register(app: MiniApp) {

    this.apps.push(app)

  }

  getApps() {

    return this.apps

  }

}