import { useState, useCallback } from 'react';
import { LoginForm, RegisterForm } from 'components';
import { AUTHENTICATION_MODE } from 'enums';

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
    <div>
      <button
        onClick={() => handleSetAuthMode(AUTHENTICATION_MODE.LOGIN)}
        disabled={authMode === AUTHENTICATION_MODE.LOGIN}
      >
        Login
      </button>
      <button
        onClick={() => handleSetAuthMode(AUTHENTICATION_MODE.REGISTER)}
        disabled={authMode === AUTHENTICATION_MODE.REGISTER}
      >
        Register
      </button>

      {authMode === AUTHENTICATION_MODE.LOGIN ? (
        <LoginForm />
      ) : (
        <RegisterForm />
      )}
    </div>
  );
};

export default Authentication;
