import React, {useEffect, useState} from 'react';
import { BrowserRouter as Router, Switch, Redirect, Route } from 'react-router-dom';
import './App.css';
import 'leaflet/dist/leaflet.css'
import {AuthenticationData} from "./classes/strava_api";
import AuthorisationCallbackHandler from "./components/authorisation_callback_handler";
import ActivityBrowser from "./components/activity_browser";

interface AppState {
  token?: String;
}

function App() {
  try {
    const acceptTokenRoute = "accept_token";

    const oAuthUrl
      = process.env.REACT_APP_STRAVA_AUTHENTICATION_URL
      + `?client_id=${process.env.REACT_APP_STRAVA_CLIENT_ID}`
      + "&response_type=code"
      + `&redirect_uri=http://${process.env.REACT_APP_APPLICATION_HOSTNAME}/${acceptTokenRoute}`
      + "&approval_prompt=force"
      + "&scope=read,activity:read";

    const storedAuthenticationdata = localStorage.getItem('authenticationData');
    const authenticationData: AuthenticationData | null = (storedAuthenticationdata
      ? JSON.parse(storedAuthenticationdata)
      : null
    )

    let isAuthenticated = false;
    if (authenticationData && (Date.now() < authenticationData.expiresAt)) {
      isAuthenticated = true;
    }

    return (
      <Router>
        <Switch>
          <Route path={"/" + acceptTokenRoute}>
            <AuthorisationCallbackHandler />
          </Route>
          <Route>
            {isAuthenticated && authenticationData
              ? <div>Welcome {authenticationData.firstName}!<br/>
                <ActivityBrowser />
              </div>
              : <LoginButton url = {oAuthUrl}/>
            }
          </Route>
        </Switch>
      </Router>
    );
  } catch (e) {
    const showDebugInfo: boolean = process.env.REACT_APP_SHOW_DEBUG_INFO=='true';
    return (
      <div className="Error">Oops, a slight hiccup with an app...
        {showDebugInfo
          ? <p>Please see details below:<br/>{e}</p>
          : <p></p>
        }
      </div>
    )
  }
}

const LoginButton = (props: {url: string}) => <div className="loginButton">
  <a href={props.url}>Log in</a>
</div>;

export default App;
