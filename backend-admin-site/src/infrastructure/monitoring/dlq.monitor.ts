import { PrismaClient } from "@prisma/client"

export async function checkDLQ(prisma: PrismaClient) {

  const count = await prisma.deadLetter.count()

  if (count > 0) {
    console.error("⚠ DLQ has events:", count)

    // позже:
    // - Slack webhook
    // - PagerDuty
    // - Email
  }
}