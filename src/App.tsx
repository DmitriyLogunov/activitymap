import React, {useState} from 'react';
import { BrowserRouter as Router, Switch, Redirect, Route } from 'react-router-dom';
import './App.css';
import 'leaflet/dist/leaflet.css'
import AuthButton from "./components/authbutton";
import AuthStore from "./components/authstore";

interface AppState {
  token?: String;
}

function App() {
  const hostname = "localhost:3000";
  const clientId: number = 53176;
  const acceptTokenRoute = "accept_token";
  const appRoute = "/";

  const state = useState<AppState>({});

  const oAuthUrl
    = "https://www.strava.com/oauth/authorize"
    + `?client_id=${clientId}`
    + "&response_type=code"
    + `&redirect_uri=http://${hostname}/${acceptTokenRoute}`
    + "&approval_prompt=force"
    + "&scope=read";

  const authToken = localStorage.getItem('authToken') || null;
  const authTokenExpiry = localStorage.getItem('authTokenExpiry') || null;

  let isAuthenticated = false;
  if (authToken && authTokenExpiry && (Date.now() < Number(authTokenExpiry))) {
    isAuthenticated = true;
  }

  return (
    <Router>
      <Switch>
        <Route path={"/"+acceptTokenRoute}>
          <p>Authenticating... Please wait to be redirected to <a href={appRoute}>{hostname}{appRoute}</a></p>
          <AuthStore tokenValidForMinutes={360}/>
          <Redirect to={appRoute} />
        </Route>
        <Route>
          {isAuthenticated
            ? <div>Saved token is {authToken}
                <div>Map placeholder</div>
              </div>
            : <AuthButton oAuthUrl={oAuthUrl}/>
          }
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
