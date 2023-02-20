import { PAGE } from 'enums'
import { auth } from 'firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

type AuthRouteProps = {
  children: string | JSX.Element | JSX.Element[]
}

const AuthRoute = ({ children }: AuthRouteProps) => {
  const navigate = useNavigate()

  useEffect(() => {
    const AuthCheck = onAuthStateChanged(auth, user => {
      if (!user) {
        navigate(PAGE.AUTHENTICATE)
      } else {
        navigate(PAGE.HOME)
      }
    })

    return () => AuthCheck()
  }, [navigate])

  return <>{children}</>
}

export default AuthRoute
