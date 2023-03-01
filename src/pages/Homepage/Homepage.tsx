import { AuthContext } from 'context'
import { fetchTodos } from 'firebase'
import { useContext } from 'react'
import { useQuery } from 'react-query'
import { Todo } from 'types'

const Homepage = () => {
  const { currentUser, signOut } = useContext(AuthContext)

  const { data: todos, isLoading, error } = useQuery<Todo[], Error>('todos', fetchTodos)

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }

  return (
    <div>
      <h3>Welcome! {currentUser?.email}</h3>
      <p>Sign In Status: {currentUser && 'active'}</p>
      <button onClick={signOut}>Sign Out</button>
      <ul>
        {todos !== undefined
          ? todos.map(todo => (
              <li key={todo.id}>
                <input type="checkbox" checked={todo.completed} />
                {todo.title}
              </li>
            ))
          : null}
      </ul>
    </div>
  )
}
export default Homepage
