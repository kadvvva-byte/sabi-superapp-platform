import { prisma } from "../../../../../../core/prisma/prisma.client"

export class MiniAppService {

  async createMiniApp(data: {
    name: string
    description?: string
    iconUrl?: string
    launchUrl: string
    createdBy: string
  }) {

    return prisma.miniApp.create({
      data
    })

  }

  async listMiniApps() {

    return prisma.miniApp.findMany({
      orderBy: {
        createdAt: "desc"
      }
    })

  }

}