import React from 'react';
import {useHistory, RouteComponentProps, withRouter} from 'react-router-dom';
import queryString from 'query-string';
import SavedAuthentication from "../classes/saved_authentication";
import StravaAPI from "../classes/strava_api";

interface AuthStoreProps extends RouteComponentProps {
}

const AuthCallbackHandler = (props: AuthStoreProps) => {
  const mainAppRoute = "/";
  const history = useHistory();

  async function obtainTokens(code: string) {
    const responseData = await StravaAPI.post(process.env.REACT_APP_STRAVA_TOKEN_ROUTE, {
      client_id: process.env.REACT_APP_STRAVA_CLIENT_ID,
      client_secret: process.env.REACT_APP_STRAVA_CLIENT_SECRET,
      code: code,
      grant_type: "authorization_code"
    });

    const authenticationData: SavedAuthentication = {
      accessToken: responseData.access_token,
      //athlete: responseData.athlete,
      firstName: responseData.athlete?.firstname,
      expiresAt: responseData.expires_at*1000,
      refreshToken: responseData.refresh_token,
    }

    localStorage.setItem('authenticationData', JSON.stringify(authenticationData));

    setTimeout(() => {
      history.push(mainAppRoute);
    }, 1000);
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

export default withRouter(AuthCallbackHandler);