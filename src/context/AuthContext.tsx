import { signOutUser, userStateListener } from 'firebase'
import { User } from 'firebase/auth'
import { createContext, ReactNode, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface Props {
  children?: ReactNode
}

export const AuthContext = createContext({
  currentUser: {} as User | null,
  setCurrentUser: (_user: User) => {},
  signOut: () => {},
})

export const AuthProvider = ({ children }: Props) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const unsubscribe = userStateListener(user => {
      if (user) {
        setCurrentUser(user)
      }
    })
    return unsubscribe
  }, [setCurrentUser])

  const signOut = () => {
    signOutUser()
    setCurrentUser(null)
    navigate('/')
  }

  const value = {
    currentUser,
    setCurrentUser,
    signOut,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
