import { Button, Loader, PasswordInput, Stack, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { showNotification } from '@mantine/notifications'
import { IconAt, IconCheck, IconCircleKeyFilled } from '@tabler/icons-react'
import { PAGE } from 'enums'
import { auth } from 'firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const LoginForm = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  const form = useForm({
    initialValues: { email: '', password: '' },

    validate: {
      email: (value: string) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value: string) => (value.trim() !== '' ? null : 'Password is required'),
    },
  })

  const { email, password } = form.values

  const navigate = useNavigate()

  const logInUser = () => {
    setIsSubmitting(prev => !prev)
    signInWithEmailAndPassword(auth, email, password)
      .then(res => {
        navigate(PAGE.HOME)
      })
      .catch(err => {
        setIsSubmitting(prev => !prev)
        showNotification({
          title: 'Error!',
          message: `${err.message}`,
          icon: <IconCheck size={16} />,
          color: 'red',
          autoClose: 5000,
        })
      })
  }

  return (
    <div>
      <form onSubmit={form.onSubmit(logInUser)}>
        <TextInput
          mb={12}
          placeholder="Email"
          label="Your email"
          aria-label="Your email"
          icon={<IconAt size={14} />}
          withAsterisk
          {...form.getInputProps('email')}
        />
        <PasswordInput
          placeholder="Password"
          label="Password"
          aria-label="Password"
          icon={<IconCircleKeyFilled size={14} />}
          withAsterisk
          description="Minimum eight characters, at least one letter and one number"
          {...form.getInputProps('password')}
        />
        <Stack>
          <Button type="submit" mt="sm">
            Login
          </Button>
          {isSubmitting ? <Loader /> : null}
        </Stack>
      </form>
    </div>
  )
}
export default LoginForm
