import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

function normalizeString(value: unknown): string | null {
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : null;
}

function normalizeLimit(value: unknown): number {
  const parsed = typeof value === "string" ? Number(value) : typeof value === "number" ? value : 20;
  if (!Number.isFinite(parsed) || parsed <= 0) return 20;
  return Math.min(Math.floor(parsed), 50);
}

router.get("/users/search", async (req, res) => {
  try {
    const q = normalizeString(req.query.q) ?? normalizeString(req.query.query) ?? normalizeString(req.query.search);
    const currentUserId =
      normalizeString(req.query.currentUserId) ??
      normalizeString(req.header("x-user-id")) ??
      normalizeString(req.header("x-current-user-id"));
    const limit = normalizeLimit(req.query.limit);

    const where: Record<string, unknown> = {};

    if (currentUserId) {
      where.id = { not: currentUserId };
    }

    if (q) {
      where.OR = [
        { displayName: { contains: q } },
        { username: { contains: q } },
        { phone: { contains: q } },
        { email: { contains: q } },
      ];
    }

    const users = await prisma.user.findMany({
      where,
      orderBy: { updatedAt: "desc" },
      take: limit,
      select: {
        id: true,
        email: true,
        username: true,
        displayName: true,
        phone: true,
        avatarUrl: true,
      },
    });

    const data = users.map((user: any) => ({
      id: user.id,
      userId: user.id,
      displayName: user.displayName || user.username || user.phone || user.email || "User",
      username: user.username ?? null,
      phone: user.phone ?? null,
      avatarUrl: user.avatarUrl ?? null,
      verified: true,
    }));

    return res.json({
      success: true,
      data,
      users: data,
      items: data,
    });
  } catch (error) {
    console.error("messenger user search error:", error);

    return res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : "messenger_user_search_failed",
    });
  }
});

export default router;
