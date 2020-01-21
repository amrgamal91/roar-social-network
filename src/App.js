import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

//MUI
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

//Redux
import { Provider } from "react-redux";
import store from "./redux/store";
import { SET_AUTHENTICATED } from "./redux/types";
import { logoutUser, getUserData } from "./redux/actions/userActions";

// Pages
import home from "./pages/home";
import login from "./pages/login";
import signup from "./pages/signup";
import user from "./pages/user";

//components
import NavBar from "./components/layout/NavBar";
import themeFile from "./util/theme";
import AuthRoute from "./util/AuthRoute";

import axios from "axios";
import jwtDecode from "jwt-decode";
import "./App.css";

//google Analytics
import ReactGA from "react-ga";

// function initializeReactGA() {
ReactGA.initialize("UA-149180300-1");
// ReactGA.pageview("/signup");
// ReactGA.pageview("/");
// ReactGA.pageview("/login");


// }

const theme = createMuiTheme(themeFile);

axios.defaults.baseURL =
  "https://us-central1-socialapp-dfb2e.cloudfunctions.net/api";
// instal jwt-decode library to decode the token

const token = localStorage.getItem("FireBaseIdToken");
// console.log("token is : " + token);

if (token) {
  const decodedToken = jwtDecode(token);
  // console.log("here is the decoded token : ", decodedToken);
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser());
    window.location.href = "./login";
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common["Authorization"] = token;
    store.dispatch(getUserData());
  }
}

class App extends Component {
  // initializeReactGA();
  render() {
    ReactGA.pageview("/signup");
    ReactGA.pageview("/");
    ReactGA.pageview("/login");
    return (
      <MuiThemeProvider theme={theme}>
        <Provider store={store}>
          <Router>
            <NavBar />
            <div className="container">
              <Switch>
                <Route exact path="/" component={home} />
                <AuthRoute exact path="/login" component={login} />
                <AuthRoute exact path="/signup" component={signup} />
                <Route exact path="/user/:handle" component={user} />
                <Route
                  exact
                  path="/users/:handle/roar/:roarId"
                  component={user}
                />
                {/* <Redirect from="/roar-social-network" exact to="/" /> */}
              </Switch>
            </div>
          </Router>
        </Provider>
      </MuiThemeProvider>
    );
  }
}
export default App;
