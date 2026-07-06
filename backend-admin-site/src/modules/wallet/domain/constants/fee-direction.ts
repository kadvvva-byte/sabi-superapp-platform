export enum FeeDirection {
  INCOMING = "incoming",
  OUTGOING = "outgoing",
}

export const FEE_DIRECTIONS = Object.freeze({
  INCOMING: FeeDirection.INCOMING,
  OUTGOING: FeeDirection.OUTGOING,
})

export type FeeDirectionValue =
  (typeof FEE_DIRECTIONS)[keyof typeof FEE_DIRECTIONS]