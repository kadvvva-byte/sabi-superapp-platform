import crypto from "crypto"

export class AuditHashService {

  generateHash(data: {
    paymentId: string
    action: string
    previousState: string
    newState: string
    metadata?: string
    previousHash?: string | null
  }): string {

    const payload = JSON.stringify(data)

    return crypto
      .createHash("sha256")
      .update(payload)
      .digest("hex")
  }
}