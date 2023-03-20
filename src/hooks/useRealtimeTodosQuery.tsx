import { AuthContext } from 'context'
import { COLLECTIONS } from 'enums'
import { db } from 'firebase'
import { collection, onSnapshot, query, where } from 'firebase/firestore'
import { useContext, useEffect, useState } from 'react'
import { Todo } from 'types'

export const useRealtimeTodosQuery = (): [Todo[], boolean, Error | undefined] => {
  const { currentUser } = useContext(AuthContext)
  const [todos, setTodos] = useState<Todo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error>()

  useEffect(() => {
    const q = query(
      collection(db, COLLECTIONS.TODOS),
      where('author', '==', currentUser !== 'initial' ? currentUser?.uid : ''),
    )
    const unsubscribe = onSnapshot(
      q,
      querySnapshot => {
        const updatedTodos: Todo[] = []
        querySnapshot.forEach(doc => {
          updatedTodos.push({
            id: doc.id,
            title: doc.data().title,
            description: doc.data().description,
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
  }, [currentUser])

  return [todos, loading, error]
}
