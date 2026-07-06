import admin from "firebase-admin"

let app: admin.app.App | null = null

export function initFirebase() {

  if (app) return app

  app = admin.initializeApp({
    credential: admin.credential.applicationDefault()
  })

  return app
}

export function getFirebase() {

  if (!app) {
    throw new Error("firebase_not_initialized")
  }

  return admin.messaging()
}