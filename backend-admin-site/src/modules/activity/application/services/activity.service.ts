import { PrismaActivityRepository } from "../../infrastructure/persistence/prisma-activity.repository"

export class ActivityService {

  constructor(
    private activityRepo: PrismaActivityRepository
  ) {}

  async log(userId: string, type: string, message: string) {

    return this.activityRepo.createActivity({
      userId,
      type,
      message
    })

  }

}