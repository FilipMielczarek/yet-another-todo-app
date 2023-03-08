import { UserAuth } from 'context'
import { COLLECTIONS } from 'enums'
import { db } from 'firebase'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { Todo } from 'types'

export const useSingleTodoQuery = () => {
  const { currentUser } = UserAuth()
  const [todos, setTodos] = useState<Todo[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<any>(null)

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const q = query(collection(db, COLLECTIONS.TODOS), where('author', '==', currentUser?.uid))
        const querySnapshot = await getDocs(q)

        const todos: Todo[] = []
        querySnapshot.forEach(doc => {
          todos.push({
            id: doc.id,
            ...doc.data(),
          } as Todo)
        })

        setTodos(todos)
        setIsLoading(false)
      } catch (error) {
        setError(error)
        setIsLoading(false)
      }
    }

    fetchTodos()
  }, [currentUser])

  return [todos, isLoading, error]
}
