import { auth } from 'firebase'
import { signOut } from 'firebase/auth'

const Homepage = () => {
  const handleSignOut = () => {
    signOut(auth)
    localStorage.removeItem('myPage.expectSignIn')
  }

  return (
    <div>
      Homepage <button onClick={handleSignOut}>Sign out of Firebase</button>
    </div>
  )
}
export default Homepage
