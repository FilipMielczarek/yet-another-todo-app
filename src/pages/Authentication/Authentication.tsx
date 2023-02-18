import { useState, useCallback } from 'react';
import { Header, LoginForm, RegisterForm } from 'components';
import { AUTHENTICATION_MODE } from 'enums';

import { Container, Space, Text, Button, Group } from '@mantine/core';

const Authentication = () => {
  const [authMode, setAuthMode] = useState<
    AUTHENTICATION_MODE.LOGIN | AUTHENTICATION_MODE.REGISTER
  >(AUTHENTICATION_MODE.LOGIN);

  const handleSetAuthMode = useCallback(
    (mode: AUTHENTICATION_MODE.LOGIN | AUTHENTICATION_MODE.REGISTER) => {
      setAuthMode(mode);
    },
    []
  );

  return (
    <Container>
      <Header />
      <Text ta='center'>Please login or register</Text>
      <Space h='xl' />
      <Group position='center' my={30}>
        <Button
          color='indigo'
          variant={
            authMode === AUTHENTICATION_MODE.LOGIN ? 'filled' : 'outline'
          }
          onClick={() => handleSetAuthMode(AUTHENTICATION_MODE.LOGIN)}
        >
          Login
        </Button>
        <Button
          color='indigo'
          variant={
            authMode === AUTHENTICATION_MODE.REGISTER ? 'filled' : 'outline'
          }
          onClick={() => handleSetAuthMode(AUTHENTICATION_MODE.REGISTER)}
        >
          Register
        </Button>
      </Group>
      {authMode === AUTHENTICATION_MODE.LOGIN ? (
        <LoginForm />
      ) : (
        <RegisterForm />
      )}
    </Container>
  );
};

export default Authentication;
