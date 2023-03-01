import { Button, Loader, TextInput } from '@mantine/core'
import { useTodoForm } from 'hooks'

const AddTodo = () => {
  const { form, addTodo, isAdding } = useTodoForm()

  return (
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
  )
}
export default AddTodo
