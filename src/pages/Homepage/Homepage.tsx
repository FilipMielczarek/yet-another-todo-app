import { LoadingOverlay } from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import { IconCheck } from '@tabler/icons-react'
import { AddTodo, TodoList } from 'components'
import { AuthContext } from 'context'
import { useRealtimeTodosQuery } from 'hooks'
import { useContext } from 'react'

const Homepage = () => {
  const { currentUser, signOut } = useContext(AuthContext)
  const [todos, loading, error] = useRealtimeTodosQuery()

  if (loading) {
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
      <AddTodo />
      <TodoList todos={todos!} />
    </div>
  )
}

export default Homepage
