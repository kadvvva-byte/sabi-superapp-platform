import { IdempotencyRepository } from "./idempotency.repository"

export class IdempotencyService {

  constructor(private repo: IdempotencyRepository) {}

  async get(key: string) {

    const record = await this.repo.find(key)

    if (!record) return null
      
    return record.responseBody
  }

  async save(key: string, response: any) {

    await this.repo.save(key, response)

  }

}