export interface SuperAppModule {
  readonly name: string
  readonly dependsOn?: readonly string[]

  init(): Promise<void> | void
  start?(): Promise<void> | void
  stop?(): Promise<void> | void
}