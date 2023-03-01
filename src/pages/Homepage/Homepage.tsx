import { Button, Loader, LoadingOverlay, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { showNotification } from '@mantine/notifications'
import { IconCheck } from '@tabler/icons-react'
import { AuthContext } from 'context'
import { fetchTodos } from 'firebase'
import { db } from 'firebase'
import { addDoc, collection } from 'firebase/firestore'
import { useState } from 'react'
import { useContext } from 'react'
import { useQuery } from 'react-query'
import { Todo } from 'types'

const Homepage = () => {
  const [isAdding, setIsAdding] = useState<boolean>(false)
  const { currentUser, signOut } = useContext(AuthContext)

  const { data: todos, isLoading, error } = useQuery<Todo[], Error>('todos', fetchTodos)

  const form = useForm({
    initialValues: { todo: '' },

    validate: {
      todo: (value: string) => (value.trim() !== '' ? null : 'Todo cant be empty'),
    },
  })

  const { todo } = form.values
  const dbRef = collection(db, 'todos')

  const todoData: Todo = {
    title: todo,
    date: new Date(),
    isFinished: false,
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

  if (isLoading) {
    return <LoadingOverlay overlayOpacity={0.7} visible />
  }

  if (error) {
    return showNotification({
      title: 'Error!',
      message: `${error.message}`,
      icon: <IconCheck size={16} />,
      color: 'red',
      autoClose: 5000,
    })
  }

  return (
    <div>
      <h3>Welcome! {currentUser?.email}</h3>
      <p>Sign In Status: {currentUser && 'active'}</p>
      <button onClick={signOut}>Sign Out</button>
      <form onSubmit={form.onSubmit(addTodo)}>
        <TextInput
          mb={12}
          placeholder="Todo"
          label="New todo"
          aria-label="New todo"
          withAsterisk
          {...form.getInputProps('todo')}
        />
        <Button type="submit" mt="sm">
          Submit
        </Button>
        {isAdding ? <Loader /> : null}
      </form>
      <ul>{todos !== undefined ? todos.map(todo => <li key={todo.id}>{todo.title}</li>) : null}</ul>
    </div>
  )
}

export default Homepage
