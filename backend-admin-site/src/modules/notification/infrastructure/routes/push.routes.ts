import { Router } from "express"
import { PrismaClient } from "@prisma/client"

const router = Router()
const prisma = new PrismaClient()

router.post("/register", async (req, res) => {

  const { userId, pushToken } = req.body

  await prisma.user.update({
    where: { id: userId },
    data: { pushToken }
  })

  res.json({ success: true })

})

export default router