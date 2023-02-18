import { useState } from 'react';
import { TextInput, Button, PasswordInput, Loader, Stack } from '@mantine/core';
import { IconAt, IconCircleKeyFilled, IconCheck } from '@tabler/icons-react';
import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import { auth } from 'firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const RegisterForm = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const form = useForm({
    initialValues: { email: '', password: '' },

    validate: {
      email: (value: string) =>
        /^\S+@\S+$/.test(value) ? null : 'Invalid email',

      password: (value: string) =>
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(value)
          ? null
          : 'Invalid password',
    },
  });

  const { email, password } = form.values;

  const registerUser = () => {
    setIsSubmitting((prev) => !prev);
    createUserWithEmailAndPassword(auth, email, password)
      .then((res) => {
        setIsSubmitting((prev) => !prev);
        showNotification({
          title: 'Success!',
          message: `Your account was created with an email address: ${res.user.email} `,
          icon: <IconCheck size={16} />,
          color: 'teal',
          autoClose: 5000,
        });

        form.setValues({ email: '', password: '' });
      })
      .catch((err) => {
        setIsSubmitting((prev) => !prev);
        showNotification({
          title: 'Error!',
          message: `${err.message}`,
          icon: <IconCheck size={16} />,
          color: 'red',
          autoClose: 5000,
        });
      });
  };

  return (
    <div>
      <form onSubmit={form.onSubmit(registerUser)}>
        <TextInput
          mb={12}
          placeholder='Email'
          label='Your email'
          aria-label='Your email'
          icon={<IconAt size={14} />}
          withAsterisk
          {...form.getInputProps('email')}
        />
        <PasswordInput
          placeholder='Password'
          label='Password'
          aria-label='Password'
          icon={<IconCircleKeyFilled size={14} />}
          withAsterisk
          description='Minimum eight characters, at least one letter and one number'
          {...form.getInputProps('password')}
        />
        <Stack>
          <Button type='submit' mt='sm'>
            Submit
          </Button>
          {isSubmitting ? <Loader /> : null}
        </Stack>
      </form>
    </div>
  );
};
export default RegisterForm;
