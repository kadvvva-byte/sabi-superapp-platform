export type MessengerKernelSessionSnapshot = {
  apiBaseUrl: string
  accessToken: string
  currentUserId: string
}

export type MessengerKernelSessionResolver = () =>
  | Promise<MessengerKernelSessionSnapshot>
  | MessengerKernelSessionSnapshot

export type MessengerKernelFetch = (
  input: string,
  init?: RequestInit,
) => Promise<Response>

export type MessengerKernelSessionConfig = {
  resolveSession: MessengerKernelSessionResolver
  fetchImpl?: MessengerKernelFetch
}