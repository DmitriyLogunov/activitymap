import React, {useEffect, useState} from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import StoredAuthenticationData from "./models/StoredAuthenticationData";
import AuthorisationCallbackHandler from "./components/AuthorisationCallbackHandler";
import ActivityBrowser from "./components/ActivityBrowser";
import './styles/App.css';
import 'leaflet/dist/leaflet.css'

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
      + "&scope=read,activity:read"; // activity:read_all";

    const storedAuthenticationDataString = localStorage.getItem('authenticationData');
    const storedAuthenticationData: StoredAuthenticationData | null = (storedAuthenticationDataString
      ? JSON.parse(storedAuthenticationDataString)
      : null
    )

    let isAuthenticated = false;
    if (storedAuthenticationData && (Date.now() < storedAuthenticationData.expiresAt)) {
      isAuthenticated = true;
    }

    return (
      <Router>
        <Switch>
          <Route path={"/" + acceptTokenRoute}>
            <AuthorisationCallbackHandler />
          </Route>
          <Route>
            {isAuthenticated && storedAuthenticationData
              ? <ActivityBrowser isAuthorisedToShowPrivateActivities={false}/>
              : <LoginButton url = {oAuthUrl}/>
            }
          </Route>
        </Switch>
      </Router>
    );
  } catch (e) {
    const showDebugInfo: boolean = process.env.REACT_APP_SHOW_DEBUG_INFO=='true';
    return (
      <div className="Error">Oops, a slight hiccup... Please restart from the <a href="/">home page</a>.
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
