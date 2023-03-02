import { COLLECTIONS } from 'enums'
import { db } from 'firebase'
import { deleteDoc, doc } from 'firebase/firestore'

export const deleteTodo = async (id: string) => {
  await deleteDoc(doc(db, COLLECTIONS.TODOS, id))
}
