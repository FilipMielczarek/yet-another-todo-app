import { COLLECTIONS } from 'enums'
import { db } from 'firebase'
import { doc, updateDoc } from 'firebase/firestore'

export const finishTodo = async (id: string) => {
  const todoRef = doc(db, COLLECTIONS.TODOS, id)

  await updateDoc(todoRef, {
    isFinished: true,
  })
}
