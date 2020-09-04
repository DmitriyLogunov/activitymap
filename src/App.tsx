import React, {useState} from 'react';
import { BrowserRouter as Router, Switch, Redirect, Route } from 'react-router-dom';

import './App.css';

interface AppState {
  token?: String;
  a: String;
}

function App() {
  const hostname = "localhost:3000";
  const clientId: number = 53176;
  const acceptTokenRoute = "accept_token";

  const state = useState<AppState>({a:"A"});

  const oAuthUrl
    = "https://www.strava.com/oauth/authorize"
    + `?client_id=${clientId}`
    + "&response_type=code"
    + `&redirect_uri=http://${hostname}/${acceptTokenRoute}`
    + "&approval_prompt=force"
    + "&scope=read";

  const isLoggedIn = true;

  return (
    <Router>
      <Switch>
        <Route path={"/"+acceptTokenRoute}>
          <div>APP</div>
        </Route>
        <Route>
          {isLoggedIn
            ? <Redirect to={{
              pathname: "/map",
              state: {
                token: "token",
              }
            }}/>
            : <a href={oAuthUrl}>Log in</a>
          }
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
