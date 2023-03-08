import { LoadingOverlay, Modal } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { AddTodo, TodoList } from 'components'
import { AuthContext } from 'context'
import { useRealtimeTodosQuery, useSingleTodoQuery } from 'hooks'
import { useContext } from 'react'
const Homepage = () => {
  const { currentUser, signOut } = useContext(AuthContext)
  const [opened, { close }] = useDisclosure(false)
  const [todos, isLoading, error] = useSingleTodoQuery()

  if (isLoading) {
    return <LoadingOverlay overlayOpacity={0.7} visible />
  }

  if (error) {
    return (
      <Modal opened={opened} onClose={close} title="Authentication">
        <p>Something went wrong when loading todos</p>
      </Modal>
    )
  }

  console.log(currentUser)

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
