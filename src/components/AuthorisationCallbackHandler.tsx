import React from 'react';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import queryString from 'query-string';
import AuthenticationData from "../models/AuthenticationData";

interface AuthStoreProps extends RouteComponentProps {
}

const AuthorisationCallbackHandler = (props: AuthStoreProps) => {
  const mainAppRoute = "/";

  const post = async (endpoint: string | undefined, parameters: Object) => {
    if (typeof(endpoint)==='undefined') {
      throw new Error("App misconfiguration: API endpoint declaration not found. Check your .env file.");
    }

    const response = await fetch(process.env.REACT_APP_STRAVA_API_BASE_URL + endpoint, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(parameters)
    });

    if (!response.ok) {
      throw new Error("Fetching of Strava API endpoint " + endpoint + " has failed: " + response.statusText);
    }

    const responseData = await response.json();

    return responseData;
  }


  async function obtainTokens(code: string) {
    const responseData = await post(process.env.REACT_APP_STRAVA_TOKEN_ROUTE, {
      client_id: process.env.REACT_APP_STRAVA_CLIENT_ID,
      client_secret: process.env.REACT_APP_STRAVA_CLIENT_SECRET,
      code: code,
      grant_type: "authorization_code"
    });

    const authenticationData: AuthenticationData = {
      accessToken: responseData.access_token,
      tokenType: responseData.token_type,
      //athlete: responseData.athlete,
      firstName: responseData.athlete?.firstname,
      expiresAt: responseData.expires_at*1000,
      refreshToken: responseData.refresh_token,
    }

    localStorage.setItem('authenticationData', JSON.stringify(authenticationData));

    setTimeout(() => {
      //history.push(mainAppRoute);
      window.location.href = mainAppRoute;
    }, 500);
  }

  let getParameters = queryString.parse(props.location.search);
  if (getParameters.code) {
    obtainTokens(String(getParameters.code));

    return (
      <p>Obtaining authentication details from Strava, please stand by...</p>
    )
  } else {
    return (
      <p>Authentication error. Please <a href={mainAppRoute}>try again</a>.</p>
    )
  }

}

export default withRouter(AuthorisationCallbackHandler);
