import { COLLECTIONS } from 'enums'
import { db } from 'firebase'
import { collection, onSnapshot } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { Todo } from 'types'

export const useRealtimeTodosQuery = (): [Todo[], boolean, Error | undefined] => {
  const [todos, setTodos] = useState<Todo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error>()

  const dbRef = collection(db, COLLECTIONS.TODOS)

  useEffect(() => {
    const unsubscribe = onSnapshot(
      dbRef,
      snapshot => {
        setLoading(false)
        const updatedTodos = snapshot.docs.map(doc => {
          const data = doc.data()
          return {
            id: doc.id,
            title: data.title,
            isFinished: data.isFinished,
            date: data.date.toDate(),
          } as Todo
        })
        updatedTodos.sort((a, b) => +b.date - +a.date)
        setTodos(updatedTodos)
      },
      error => {
        setLoading(false)
        setError(error)
      },
    )

    return () => unsubscribe()
  }, [dbRef])

  return [todos, loading, error]
}
