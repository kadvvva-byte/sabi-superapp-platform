import { prisma } from "../../config/prisma";

type AuditLogDelegate = {
  create(args: {
    data: {
      userId?: string;
      action: string;
      ip?: string;
      userAgent?: string;
    };
  }): Promise<unknown>;
};

function getAuditLogDelegate(): AuditLogDelegate | null {
  const maybeDelegate = (prisma as unknown as { auditLog?: AuditLogDelegate }).auditLog;
  return maybeDelegate ?? null;
}

export class AuditRepository {
  async create(data: {
    userId?: string;
    action: string;
    ip?: string;
    userAgent?: string;
  }) {
    const auditLog = getAuditLogDelegate();

    if (!auditLog) {
      return {
        id: `audit_runtime_${Date.now()}`,
        ...data,
        createdAt: new Date(),
        persisted: false,
      };
    }

    return auditLog.create({ data });
  }
}
