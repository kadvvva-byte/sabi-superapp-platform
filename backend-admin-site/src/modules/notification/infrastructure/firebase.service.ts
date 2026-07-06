import admin from "firebase-admin"

export class FirebaseService {

  constructor() {

    admin.initializeApp({
      credential: admin.credential.applicationDefault()
    })

  }

  async sendPush(token: string, title: string, body: string) {

    await admin.messaging().send({
      token,
      notification: {
        title,
        body
      }
    })

  }

}