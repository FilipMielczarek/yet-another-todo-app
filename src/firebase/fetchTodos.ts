import { collection, getDocs } from 'firebase/firestore'
import { useQuery } from 'react-query'

import { db } from './firebase'

interface Todo {
  id: string
  title: string
  completed: boolean
}

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
