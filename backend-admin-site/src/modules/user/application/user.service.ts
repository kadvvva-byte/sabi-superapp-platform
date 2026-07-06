import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type SearchUsersParams = {
  query?: string;
  currentUserId?: string;
  limit?: number;
};

type SearchUserResult = {
  userId: string;
  displayName: string;
  username: string | null;
  phone: string | null;
  avatarUrl: string | null;
  verified: boolean;
};

function normalizeSearchPhone(value?: string | null) {
  return String(value ?? "").replace(/[^\d+]/g, "").trim();
}

function buildDisplayNameFromRecord(record: {
  email?: string | null;
  phone?: string | null;
  displayName?: string | null;
  username?: string | null;
}) {
  const displayName = String(record.displayName ?? "").trim();
  const username = String(record.username ?? "").trim();
  const email = String(record.email ?? "").trim();
  const phone = String(record.phone ?? "").trim();

  if (displayName) return displayName;
  if (username) return username.startsWith("@") ? username.slice(1) : username;

  const emailLocal = email.split("@")[0]?.trim();
  if (emailLocal) return emailLocal;
  if (phone) return phone;

  return "User";
}

export class UserService {
  async createUser(email: string, phone: string, password: string) {
    const user = await prisma.user.create({
      data: {
        email,
        phone,
        password,
        role: "USER",
      },
    });

    return user;
  }

  async searchUsers(params: SearchUsersParams): Promise<SearchUserResult[]> {
    const rawQuery = String(params.query ?? "").trim();
    const normalizedPhone = normalizeSearchPhone(rawQuery);
    const normalizedQuery = rawQuery.toLowerCase();
    const sanitizedCurrentUserId = String(params.currentUserId ?? "").trim();

    const take = Math.max(
      1,
      Math.min(50, Number.isFinite(params.limit as number) ? Number(params.limit) : 20),
    );

    const users = await prisma.user.findMany({
      where: {
        ...(sanitizedCurrentUserId
          ? {
              id: {
                not: sanitizedCurrentUserId,
              },
            }
          : {}),
        ...(rawQuery
          ? {
              OR: [
                {
                  phone: {
                    contains: normalizedPhone || rawQuery,
                    mode: "insensitive",
                  },
                },
                {
                  username: {
                    contains: rawQuery.replace(/^@+/, ""),
                    mode: "insensitive",
                  },
                },
                {
                  displayName: {
                    contains: rawQuery,
                    mode: "insensitive",
                  },
                },
                {
                  email: {
                    contains: normalizedQuery,
                    mode: "insensitive",
                  },
                },
                {
                  id: {
                    contains: rawQuery,
                    mode: "insensitive",
                  },
                },
              ],
            }
          : {
              isPublicProfile: true,
            }),
      },
      orderBy: [{ updatedAt: "desc" }, { createdAt: "desc" }],
      take,
    });

    return users.map((user: any) => {
      const username =
        typeof user.username === "string" && user.username.trim()
          ? user.username.trim().startsWith("@")
            ? user.username.trim()
            : `@${user.username.trim()}`
          : null;

      return {
        userId: String(user.id),
        displayName: buildDisplayNameFromRecord({
          email: user.email,
          phone: user.phone,
          displayName: user.displayName,
          username: user.username,
        }),
        username,
        phone:
          typeof user.phone === "string" && user.phone.trim()
            ? user.phone.trim()
            : null,
        avatarUrl:
          typeof user.avatarUrl === "string" && user.avatarUrl.trim()
            ? user.avatarUrl.trim()
            : null,
        verified: Boolean(user.username?.trim() || user.phone?.trim()),
      };
    });
  }
}
