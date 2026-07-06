import { PrismaClient } from "@prisma/client";

export type PrismaRecord = Record<string, unknown>;
export type PrismaWhere = Record<string, unknown>;
export type PrismaData = Record<string, unknown>;

export type PrismaModelDelegate = {
  create(args: { data: PrismaData }): Promise<PrismaRecord>;
  findUnique(args: { where: PrismaWhere }): Promise<PrismaRecord | null>;
  findMany(args?: {
    where?: PrismaWhere;
    orderBy?: PrismaRecord | PrismaRecord[];
    take?: number;
  }): Promise<PrismaRecord[]>;
  update?: (args: {
    where: PrismaWhere;
    data: PrismaData;
  }) => Promise<PrismaRecord>;
  upsert?: (args: {
    where: PrismaWhere;
    create: PrismaData;
    update: PrismaData;
  }) => Promise<PrismaRecord>;
  delete?: (args: { where: PrismaWhere }) => Promise<PrismaRecord>;
};

function isDelegate(value: unknown): value is PrismaModelDelegate {
  if (!value || typeof value !== "object") return false;

  const record = value as Record<string, unknown>;

  return (
    typeof record.findUnique === "function" ||
    typeof record.findMany === "function" ||
    typeof record.create === "function" ||
    typeof record.upsert === "function"
  );
}

function normalizeKey(value: string): string {
  return value.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
}

export function getPrismaDelegate(
  client: PrismaClient,
  candidates: string[],
): PrismaModelDelegate {
  const prismaRecord = client as unknown as Record<string, unknown>;

  for (const candidate of candidates) {
    const delegate = prismaRecord[candidate];

    if (isDelegate(delegate)) {
      return delegate;
    }
  }

  const entries = Object.entries(prismaRecord).filter(([, value]) =>
    isDelegate(value),
  ) as Array<[string, PrismaModelDelegate]>;

  const normalizedCandidates = candidates
    .map(normalizeKey)
    .filter((item) => item.length > 0);

  let bestMatch: PrismaModelDelegate | null = null;
  let bestScore = -1;

  for (const [key, delegate] of entries) {
    const normalizedKey = normalizeKey(key);

    for (const candidate of normalizedCandidates) {
      let score = -1;

      if (normalizedKey === candidate) {
        score = 1000 + candidate.length;
      } else if (normalizedKey.includes(candidate)) {
        score = 100 + candidate.length;
      } else if (candidate.includes(normalizedKey)) {
        score = 50 + normalizedKey.length;
      }

      if (score > bestScore) {
        bestScore = score;
        bestMatch = delegate;
      }
    }
  }

  if (bestMatch) {
    return bestMatch;
  }

  const available = entries.map(([key]) => key).sort().join(", ");

  throw new Error(
    `Prisma messenger delegate not found. Tried: ${candidates.join(", ")}. Available delegates: ${available}`,
  );
}