import React, {useState} from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AuthorisationCallbackHandler from "./components/AuthorisationCallbackHandler";
import ActivityBrowser from "./components/ActivityBrowser";
import './styles/App.scss';
import 'leaflet/dist/leaflet.css'
import LoginPrompt from "./components/LoginPrompt";
import {getToken} from "./models/AuthenticationData";

interface AppState {
  token?: string;
  includePrivateActivities: boolean;
}

function App() {
  const [state, setState] = useState<AppState>({
    includePrivateActivities: false,
  })

  try {
    const acceptTokenRoute = "accept_token";

    const [token] = getToken();
    const isAuthenticated = (token!==null);

    const oAuthUrl
      = process.env.REACT_APP_STRAVA_AUTHENTICATION_URL
      + `?client_id=${process.env.REACT_APP_STRAVA_CLIENT_ID}`
      + "&response_type=code"
      + `&redirect_uri=http://${process.env.REACT_APP_APPLICATION_HOSTNAME}/${acceptTokenRoute}`
      + "&approval_prompt=force"
      + "&scope=read,activity:read" +
      ((state.includePrivateActivities)?",activity:read_all":"");

    const handleIncludePrivateChange = (newIncludePrivate: boolean) => {
      setState({
        ...state,
        includePrivateActivities: newIncludePrivate,
      })
    }

    return (
      <Router>
        <Switch>
          <Route path={"/" + acceptTokenRoute}>
            <AuthorisationCallbackHandler />
          </Route>
          <Route>
            <div className={"app"}>
              {isAuthenticated
                ? <ActivityBrowser includePrivateActivities={state.includePrivateActivities}/>
                : <div className={"login-prompt"}>
                    <LoginPrompt includePrivateActivities={state.includePrivateActivities} url={oAuthUrl} onIncludePrivateChange={handleIncludePrivateChange}/>
                </div>
              }
            </div>
          </Route>
        </Switch>
      </Router>
    );
  } catch (e) {
    const showDebugInfo: boolean = process.env.REACT_APP_SHOW_DEBUG_INFO==='true';
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

export default App;
