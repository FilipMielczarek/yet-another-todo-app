import { deleteTodo, finishTodo } from 'functions'
import { Todo } from 'types'

interface TodoListProps {
  todos: Todo[]
}

const TodoList = ({ todos }: TodoListProps) => {
  return (
    <>
      {todos.length !== 0 ? (
        <ul>
          {todos.map(todo => (
            <li key={todo.id}>
              {todo.title}
              {todo.description}
              {todo.isFinished ? 'Finished' : 'Not finished'}
              <button onClick={() => deleteTodo(todo.id!)}>Delete</button>
              {!todo.isFinished ? <button onClick={() => finishTodo(todo.id!)}>Finish</button> : ''}
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
