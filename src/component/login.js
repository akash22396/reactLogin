import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import Axios from "axios";
import server_url from "../api";
// import Header from "../shared/header";
import localStorage from "localStorage";
import { Redirect, NavLink } from "react-router-dom";
import * as actionTypes from "../store/actions/actionTypes";
import { userLoginAction } from "../store/actions/index";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMount: false,
      email: "",
      password: "",
      msg: ""
    };
  }
  componentDidMount() {
    this.setState({ isMount: true });
  }

  componentDidUpdate() {}

  loginForm(e) {
    e.preventDefault();
    let form = {
      email: this.state.email,
      password: this.state.password
    };
    Axios.post(server_url + `/user/login`, form)
      .then(res => {
        // console.log(res.data)
        const st = res.data;
        // console.log(st.msg);
        if (st.msg === "login successfully") {
          localStorage.setItem("token", st.token);
          // this.props.loginStatus(true);
          this.props.userData();
          // this.props.login(true)
        } else {
          this.setState({ msg: "invalid email or password!" });
          this.props.login(false);
        }
      })
      .catch(error => {
        console.log(error);
        // console.log('err');
      });
  }

  onFormChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      <Fragment>
        <section className="bg-light ">
          {this.state.isMount ? (
            this.props.loginStatus ? (
              <Redirect to="/" />
            ) : (
              <Fragment>
                {/* <Header /> */}
                <div className="container min-vh-100">
                  <div className="row py-5 justify-content-center align-items-center  min-vh-100">
                    <div className="col-md-6 align-self-center ">
                      <div className="card z-depth-1">
                        <div className="card-body ">
                          <h3 className="h3">Login</h3>
                          {/* login  status {this.props.loginStatus ? 'true' : 'fasle'} */}
                          <form onSubmit={this.loginForm.bind(this)}>
                            <div className="form-group">
                              <label>Email</label>
                              <input
                                type="email"
                                className="form-control form-control-md"
                                name="email"
                                value={this.state.email}
                                onChange={this.onFormChange.bind(this)}
                                required
                              />
                            </div>
                            <div className="form-group">
                              <label>Password</label>
                              <input
                                type="password"
                                className="form-control form-control-md"
                                name="password"
                                value={this.state.password}
                                onChange={this.onFormChange.bind(this)}
                                required
                              />
                            </div>
                            <div className="py-1">{this.state.msg}</div>
                            <button
                              type="submit"
                              className="btn btn-md btn-primary"
                            >
                              Login{" "}
                            </button>
                            <NavLink
                              to="/signup"
                              className="btn btn-md btn-primary ml-2"
                            >
                              Sign UP
                            </NavLink>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Fragment>
            )
          ) : (
            ""
          )}
        </section>
      </Fragment>
    );
  }
}
const mapGetState = state => {
  return {
    loginStatus: state.usr.login
  };
};

const mapDispatchState = dispatch => {
  return {
    login: data => dispatch({ type: actionTypes.LOGIN_STATUS, payload: data }),
    userData: data => dispatch(userLoginAction(data))
  };
};
export default connect(mapGetState, mapDispatchState)(Login);
