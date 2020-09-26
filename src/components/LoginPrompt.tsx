import React, {ChangeEvent} from "react";
import '../styles/LoginPrompt.scss';

interface LoginPromptProps {
  url: string,
  includePrivateActivities: boolean,
  onIncludePrivateChange: (newValue: boolean) => void,
}

const LoginPrompt = (props: LoginPromptProps) => <div className="loginButton">
  <form className="login-parameters">
    <label>
      <input
        type="checkbox"
        defaultChecked={props.includePrivateActivities}
        onChange={
          (event: ChangeEvent<HTMLInputElement>) => {
            props.onIncludePrivateChange(event.target.checked)
          }
        }
      />
      Include private activities and private zones
    </label>
  </form>
  <a href={props.url} className={"login-button"}>Log in</a>
</div>;

export default LoginPrompt