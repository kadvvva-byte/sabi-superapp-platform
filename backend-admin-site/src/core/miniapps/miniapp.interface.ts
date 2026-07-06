export interface MiniApp {

  name: string

  icon: string

  url: string

  init(): Promise<void> | void

}