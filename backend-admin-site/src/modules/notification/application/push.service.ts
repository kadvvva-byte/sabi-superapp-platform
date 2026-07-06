import { getFirebase } from "../../../core/push/firebase"

export class PushService {

  async sendPush(
    token: string,
    title: string,
    body: string
  ) {

    try {

      const messaging = getFirebase()

      await messaging.send({
        token,
        notification: {
          title,
          body
        }
      })

    } catch (error) {

      console.error("push_error", error)

    }

  }

}