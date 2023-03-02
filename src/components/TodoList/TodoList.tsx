import { deleteTodo } from 'functions'

interface TodoListProps {
  todos: {
    id?: string
    title: string
  }[]
}

const TodoList = ({ todos }: TodoListProps) => {
  return (
    <>
      {todos.length !== 0 ? (
        <ul>
          {todos.map(todo => (
            <li key={todo.id}>
              {todo.title}
              <button onClick={() => deleteTodo(todo.id!)}>Delete</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>Your list is empty</p>
      )}
    </>
  )
}
export default TodoList
