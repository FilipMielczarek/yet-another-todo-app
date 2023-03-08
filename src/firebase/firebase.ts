import { initializeApp } from 'firebase/app'
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore()

const signUpUser = async (email: string, password: string) => {
  if (!email && !password) return

  return await createUserWithEmailAndPassword(auth, email, password)
}

const signInUser = async (email: string, password: string) => {
  if (!email && !password) return

  return await signInWithEmailAndPassword(auth, email, password)
}

const signOutUser = async () => await signOut(auth)

export { app, auth, db, signInUser, signOutUser, signUpUser }
