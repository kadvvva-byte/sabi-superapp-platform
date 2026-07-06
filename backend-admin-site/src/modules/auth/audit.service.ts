import { AuditRepository } from "./audit.repository";

export class AuditService {
  private auditRepository = new AuditRepository();

  async log(data: {
    userId?: string;
    action: string;
    ip?: string;
    userAgent?: string;
  }) {
    return this.auditRepository.create(data);
  }
}