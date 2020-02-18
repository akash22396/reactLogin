import React, { Component, Fragment } from 'react';
// import logo from './logo.svg';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './styles/App.scss';
import { connect } from 'react-redux'
import home from './component/home';
import Login from './component/login';
import Signup from './component/signup';
import user_profile from './component/user_profile';


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isMount: false

    }
  }
  componentDidMount() {

  }
  loginSt() {

  }
  render() {
    return (
      <Fragment>
        <Router>
          <Switch>
            <Route path='/' exact component={home} />
            <Route path='/login' exact component={Login} />
            <Route path='/signup' exact component={Signup} />
            <Route path='/user_profile' exact component={user_profile} />
          </Switch>
        </Router>
        {/* <p>Welcome to react app</p> */}
      </Fragment>
    )
  }
}

export default connect()(App);
