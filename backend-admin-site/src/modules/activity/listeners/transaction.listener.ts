import { PrismaActivityRepository } from "../infrastructure/persistence/prisma-activity.repository"
import { ActivityService } from "../application/services/activity.service"

const repo = new PrismaActivityRepository()
const activityService = new ActivityService(repo)

export async function transactionListener(event: any) {

  await activityService.log(
    event.userId,
    "TRANSACTION",
    `Transaction ${event.amount}`
  )

}