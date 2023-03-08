import { auth, signOutUser } from 'firebase'
import { onAuthStateChanged, User } from 'firebase/auth'
import { useContext } from 'react'
import { createContext, ReactNode, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface Props {
  children?: ReactNode
}

export const AuthContext = createContext({
  currentUser: null as User | null,
  setCurrentUser: (_user: User) => {},
  signOut: () => {},
})

export const AuthProvider = ({ children }: Props) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setCurrentUser(user)
    })
    return () => {
      unsubscribe()
    }
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

export const UserAuth = () => {
  return useContext(AuthContext)
}
