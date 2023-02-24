import { Button, Checkbox, Loader, PasswordInput, Stack, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { showNotification } from '@mantine/notifications'
import { IconAt, IconCheck, IconCircleKeyFilled } from '@tabler/icons-react'
import { signUpUser } from 'firebase'
import { useState } from 'react'

const RegisterForm = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  const form = useForm({
    initialValues: { email: '', password: '', agreeToTerms: false },

    validate: {
      email: (value: string) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),

      password: (value: string) =>
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(value)
          ? null
          : 'The password does not meet the requirements',

      agreeToTerms: (value: boolean) =>
        value ? null : 'You must agree to the terms and conditions',
    },
  })

  const { email, password } = form.values

  const registerUser = () => {
    setIsSubmitting(prev => !prev)
    signUpUser(email, password)
      .then(res => {
        setIsSubmitting(prev => !prev)
        showNotification({
          title: 'Success!',
          message: `Your account was created with an email address: ${email} `,
          icon: <IconCheck size={16} />,
          color: 'teal',
          autoClose: 5000,
        })
        form.setValues({ email: '', password: '' })
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
      <form onSubmit={form.onSubmit(registerUser)}>
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
          mb={12}
          placeholder="Password"
          label="Password"
          aria-label="Password"
          icon={<IconCircleKeyFilled size={14} />}
          withAsterisk
          description="Minimum eight characters, at least one letter and one number"
          {...form.getInputProps('password')}
        />
        <Checkbox
          label="I agree to the terms and conditions"
          {...form.getInputProps('agreeToTerms')}
        />
        <Stack>
          <Button type="submit" mt="sm">
            Register
          </Button>
          {isSubmitting ? <Loader /> : null}
        </Stack>
      </form>
    </div>
  )
}
export default RegisterForm
