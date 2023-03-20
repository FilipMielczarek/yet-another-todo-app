import { auth, signOutUser } from 'firebase'
import { onAuthStateChanged, User } from 'firebase/auth'
import { createContext, ReactNode, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface Props {
  children?: ReactNode
}

export const AuthContext = createContext({
  currentUser: {} as User | 'initial' | null,
  setCurrentUser: (_user: User) => {},
  signOut: () => {},
})

export const AuthProvider = ({ children }: Props) => {
  const [currentUser, setCurrentUser] = useState<User | 'initial' | null>('initial')
  const navigate = useNavigate()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        return setCurrentUser(user)
      }
      setCurrentUser(null)
    })
    return unsubscribe
  }, [])

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
