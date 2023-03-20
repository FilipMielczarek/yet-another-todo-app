import { LoadingOverlay, Modal } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { AddTodo, Header, TodoList } from 'components'
import { useRealtimeTodosQuery } from 'hooks'

const Homepage = () => {
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
      <Header />
      <AddTodo />
      {/* <TodoList todos={todos!} /> */}
    </div>
  )
}

export default Homepage
