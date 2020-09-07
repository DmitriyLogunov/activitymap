import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import queryString from 'query-string';

interface AuthStoreProps extends RouteComponentProps {
  tokenValidForMinutes: number;
}

const AuthStore = (props: AuthStoreProps) => {

  let getParameters = queryString.parse(props.location.search);

  if (getParameters.code) {
    localStorage.setItem('authToken', getParameters.code.toString());
    localStorage.setItem('authTokenExpiry', (Date.now() + props.tokenValidForMinutes*60000).toString());
  }

  return (
    <div />
  )

}

export default withRouter(AuthStore);