import { COLLECTIONS } from 'enums'
import { db } from 'firebase'
import { collection, getDocs } from 'firebase/firestore'
import { Todo } from 'types'

export const useSingleTodoQuery = async () => {
  const querySnapshot = await getDocs(collection(db, COLLECTIONS.TODOS))
  const todos: Todo[] = []

  querySnapshot.forEach(doc => {
    todos.push({
      id: doc.id,
      ...doc.data(),
    } as Todo)
  })

  return todos
}
