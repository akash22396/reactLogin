import React, { Component, Fragment } from "react";
// import logo from './logo.svg';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./styles/bootstrap.min.css";
import "./styles/App.scss";

import "../node_modules/jquery/dist/jquery.slim";
import "../node_modules/popper.js/dist/umd/popper";
import "../node_modules/bootstrap/dist/js/bootstrap";
import { connect } from "react-redux";
import home from "./component/home";
import Login from "./component/login";
import Signup from "./component/signup";
import user_profile from "./component/user_profile";

import localStorage from "localStorage";
import { userLoginAction } from "./store/actions/userLoginAction";
import * as actionTypes from "./store/actions/actionTypes";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMount: false
    };
  }
  componentDidMount() {
    const token = localStorage.getItem("token");
    if (token != null && this.props.loginStatus === false) {
      // this.userLoginData(token)
      this.props.userData();
    }

    this.setState({ isMount: true });
  }
  loginSt() {}
  render() {
    let route = (
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/login" exact component={Login} />
        <Route path="/signup" exact component={Signup} />

        <Route path="*">
          <Redirect to="/login" />
        </Route>
        {/* <Route path="/user_profile" exact component={user_profile} /> */}
      </Switch>
    );

    if (this.props.loginStatus === true) {
      route = (
        <Switch>
          <Route path="/" exact component={home} />
          {/* <Route path="/login" exact component={Login} />
  <Route path="/signup" exact component={Signup} /> */}
          <Route path="/user_profile" exact component={user_profile} />
          <Route path="*">
            <Redirect to="/" />
          </Route>
        </Switch>
      );
    }

    return (
      <Fragment>
        {this.state.isMount ? <Router>{route}</Router> : <div>Loading..</div>}

        {/* <p>Welcome to react app</p> */}
      </Fragment>
    );
  }
}

const mapGetState = state => {
  return {
    loginStatus: state.usr.login,
    getUserData: state.usr.userInfo
  };
};

const mapDispatchState = dispatch => {
  return {
    login: data => dispatch({ type: actionTypes.LOGIN_STATUS, payload: data }),
    userData: data => dispatch(userLoginAction(data))
  };
};
export default connect(mapGetState, mapDispatchState)(App);
