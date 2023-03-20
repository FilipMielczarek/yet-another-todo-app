import { LoadingOverlay } from '@mantine/core'
import { AuthContext } from 'context'
import { useContext } from 'react'
import { Navigate, useLocation } from 'react-router-dom'

const ProtectedPath = ({ children }: { children: JSX.Element }) => {
  const { currentUser } = useContext(AuthContext)
  let location = useLocation()

  if (currentUser === 'initial') {
    return <LoadingOverlay overlayOpacity={0.7} visible />
  }

  if (!currentUser) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}

export default ProtectedPath
