import React, {useState} from 'react';
import { BrowserRouter as Router, Switch, Redirect, Route } from 'react-router-dom';
import './App.css';
import 'leaflet/dist/leaflet.css'
import AuthButton from "./components/authbutton";
import AuthCallbackHandler from "./components/authcallbackhandler";
import SavedAuthentication from "./classes/saved_authentication";

interface AppState {
  token?: String;
}

function App() {
  try {
    const acceptTokenRoute = "accept_token";

    const state = useState<AppState>({});

    const oAuthUrl
      = process.env.REACT_APP_STRAVA_AUTHENTICATION_URL
      + `?client_id=${process.env.REACT_APP_STRAVA_CLIENT_ID}`
      + "&response_type=code"
      + `&redirect_uri=http://${process.env.REACT_APP_APPLICATION_HOSTNAME}/${acceptTokenRoute}`
      + "&approval_prompt=force"
      + "&scope=read,activity:read";

    const storedAuthenticationdata = localStorage.getItem('authenticationData');
    const authenticationData: SavedAuthentication | null = (storedAuthenticationdata
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
            <AuthCallbackHandler/>
          </Route>
          <Route>
            {isAuthenticated && authenticationData
              ? <div>Welcome {authenticationData.firstName}!<br/>
                Map placeholder
              </div>
              : <AuthButton oAuthUrl={oAuthUrl}/>
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

export default App;
