import { LoadingOverlay, Modal } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { useQuery } from '@tanstack/react-query'
import { AddTodo, TodoList } from 'components'
import { UserAuth } from 'context'
import { COLLECTIONS } from 'enums'
import { useRealtimeTodosQuery, useSingleTodoQuery } from 'hooks'
import { Todo } from 'types'

const Homepage = () => {
  const { currentUser, signOut } = UserAuth()
  const [opened, { close }] = useDisclosure(false)
  // const [todos, loading, error] = useRealtimeTodosQuery()

  const {
    data: todos = [],
    isLoading,
    error,
  } = useQuery<Todo[]>({ queryKey: [COLLECTIONS.TODOS], queryFn: useSingleTodoQuery })

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
      <h3>Welcome! {currentUser?.email}</h3>
      <p>Sign In Status: {currentUser && 'active'}</p>
      <button onClick={signOut}>Sign Out</button>
      <AddTodo />
      <TodoList todos={todos!} />
    </div>
  )
}

export default Homepage
