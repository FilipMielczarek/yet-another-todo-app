import { useForm } from '@mantine/form'
import { showNotification } from '@mantine/notifications'
import { IconCheck } from '@tabler/icons-react'
import { AuthContext } from 'context'
import { COLLECTIONS } from 'enums'
import { db } from 'firebase'
import { addDoc, collection } from 'firebase/firestore'
import { useContext } from 'react'
import { useState } from 'react'
import { Todo } from 'types'

export const useTodoForm = () => {
  const { currentUser } = useContext(AuthContext)
  const [isAdding, setIsAdding] = useState<boolean>(false)

  const form = useForm({
    initialValues: { todo: '' },

    validate: {
      todo: (value: string) => (value.trim() !== '' ? null : 'Todo cant be empty'),
    },
  })

  const { todo } = form.values
  const dbRef = collection(db, COLLECTIONS.TODOS)

  const todoData: Todo = {
    title: todo,
    date: new Date(),
    isFinished: false,
    author: currentUser !== 'initial' ? currentUser?.uid ?? '' : '',
  }

  const addTodo = () => {
    setIsAdding(prev => !prev)

    addDoc(dbRef, todoData)
      .then(docRef => {
        setIsAdding(prev => !prev)
        showNotification({
          title: 'Success!',
          message: `Your todo item was created! `,
          icon: <IconCheck size={16} />,
          color: 'teal',
          autoClose: 5000,
        })
        form.setValues({ todo: '' })
      })
      .catch(error => {
        setIsAdding(prev => !prev)
        showNotification({
          title: 'Error!',
          message: `${error.message}`,
          icon: <IconCheck size={16} />,
          color: 'red',
          autoClose: 5000,
        })
      })
  }

  return { isAdding, addTodo, form }
}
