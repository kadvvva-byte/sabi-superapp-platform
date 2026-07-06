export function encodePayload(data: object): string {

  const json = JSON.stringify(data)

  return Buffer.from(json).toString("base64")

}

export function decodePayload(payload: string): any {

  const json = Buffer.from(payload, "base64").toString()

  return JSON.parse(json)

}