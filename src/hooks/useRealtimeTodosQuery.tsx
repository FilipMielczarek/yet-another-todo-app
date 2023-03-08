import { COLLECTIONS } from 'enums'
import { db } from 'firebase'
import { collection, onSnapshot } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { Todo } from 'types'

export const useRealtimeTodosQuery = (): [Todo[], boolean, Error | undefined] => {
  const [todos, setTodos] = useState<Todo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error>()

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, COLLECTIONS.TODOS),
      snapshot => {
        const updatedTodos: Todo[] = []
        snapshot.forEach(doc => {
          updatedTodos.push({
            id: doc.id,
            title: doc.data().title,
            isFinished: doc.data().isFinished,
            date: doc.data().date.toDate(),
            author: doc.data().author,
          })
        })
        updatedTodos.sort((a, b) => +b.date - +a.date)
        setTodos(updatedTodos)
        setLoading(false)
      },
      error => {
        setError(error)
        setLoading(false)
      },
    )

    return () => unsubscribe()
  }, [])

  return [todos, loading, error]
}
