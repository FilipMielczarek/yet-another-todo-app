import { UserAuth } from 'context'
import { Navigate, useLocation } from 'react-router-dom'

const ProtectedPath = ({ children }: { children: JSX.Element }) => {
  const { currentUser } = UserAuth()
  let location = useLocation()

  if (!currentUser) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}

export default ProtectedPath
