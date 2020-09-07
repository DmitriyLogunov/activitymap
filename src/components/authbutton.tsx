import React from 'react';

interface AuthButtonProps {
  oAuthUrl: string;
}

const AuthButton = (props: AuthButtonProps) => {
  return (
    <div className="loginButton">
      <a href={props.oAuthUrl}>Log in</a>
    </div>
  );
}

export default AuthButton;