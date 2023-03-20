import { LoadingOverlay, Modal } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { AddTodo, TodoList } from 'components'
import { AuthContext } from 'context'
import { useRealtimeTodosQuery } from 'hooks'
import { useContext } from 'react'

const Homepage = () => {
  const { currentUser, signOut } = useContext(AuthContext)
  const [opened, { close }] = useDisclosure(false)
  const [todos, isLoading, error] = useRealtimeTodosQuery()

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

  return (
    <div>
      <h3>Welcome! {currentUser !== 'initial' && currentUser?.email}</h3>
      <p>Sign In Status: {currentUser && currentUser !== 'initial' && 'active'}</p>
      <button onClick={signOut}>Sign Out</button>
      <AddTodo />
      <TodoList todos={todos!} />
    </div>
  )
}

export default Homepage
