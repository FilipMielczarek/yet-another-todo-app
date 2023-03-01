import { collection, getDocs } from 'firebase/firestore'
import { Todo } from 'types'

import { db } from './firebase'

const fetchTodos = async () => {
  const querySnapshot = await getDocs(collection(db, 'todos'))
  const todos: Todo[] = []

  querySnapshot.forEach(doc => {
    todos.push({
      id: doc.id,
      ...doc.data(),
    } as Todo)
  })

  return todos
}

export default fetchTodos
