import React, { Component, Fragment } from "react";
// import Header from "../shared/header";
import { connect } from "react-redux";
import { Redirect, NavLink } from "react-router-dom";
import Axios from "axios";
import server_url from "../api";
import { userLoginAction } from "../store/actions/index";
import * as actionTypes from "../store/actions/actionTypes";
class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMount: false,
      email: "",
      password: "",
      username: "",
      mob_no: "",
      gender: "",
      age: "",
      city: "",
      country: "",
      user_image: []
    };
  }

  componentDidMount() {}

  // req.body.username, req.body.email, req.body.password, req.body.mob_no, req.body.gender, req.body.age, req.body.city, req.body.country, req.file.filename
  signUpForm(e) {
    e.preventDefault();
    let file = this.state.user_image;
    const formData = new FormData();
    formData.append("user_image", file);
    formData.append("city", this.state.city);
    formData.append("country", this.state.country);
    formData.append("gender", this.state.gender);
    formData.append("age", this.state.age);
    formData.append("username", this.state.username);
    formData.append("email", this.state.email);
    formData.append("password", this.state.password);
    formData.append("mob_no", this.state.mob_no);

    const config = {
      headers: {
        "content-type": "multipart/form-data"
      }
    };

    // let form = {
    //     email: this.state.email,
    //     password: this.state.password,

    // }
    Axios.post(server_url + `/user/registerUser`, formData, config)
      .then(res => {
        // console.log(res.data)
        // if()
        const st = res.data;
        // console.log(st.msg);
        if (st.msg === "login successfully") {
          localStorage.setItem("token", st.token);
          // this.props.loginStatus(true);
          this.props.userData();
          // this.props.login(true)
        } else {
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
  onFormChangeImg(e) {
    this.setState({ user_image: e.target.files[0] });
  }
  render() {
    return (
      <Fragment>
        <section className="bg-light ">
          {this.props.loginStatus ? (
            <Redirect to="/" />
          ) : (
            <Fragment>
              {/* <Header /> */}
              <div className="container">
                <div className="row py-5 justify-content-center align-items-center  min-vh-100">
                  <div className="col-md-6 align-self-center ">
                    <div className="card z-depth-1">
                      <div className="card-body ">
                        <h3 className="h3">Sign UP</h3>
                        {/* login  status {this.props.loginStatus ? 'true' : 'fasle'} */}
                        <form onSubmit={this.signUpForm.bind(this)}>
                          <div className="form-group">
                            <label>User Name</label>
                            <input
                              type="text"
                              className="form-control form-control-md"
                              name="username"
                              value={this.state.username}
                              onChange={this.onFormChange.bind(this)}
                              required
                            />
                          </div>
                          <div className="form-group">
                            <label>Mobile No</label>
                            <input
                              type="number"
                              className="form-control form-control-md"
                              name="mob_no"
                              value={this.state.mob_no}
                              onChange={this.onFormChange.bind(this)}
                              required
                            />
                          </div>
                          <div className="form-group">
                            <label>Gender</label>
                            <input
                              type="text"
                              className="form-control form-control-md"
                              name="gender"
                              value={this.state.gender}
                              onChange={this.onFormChange.bind(this)}
                              required
                            />
                          </div>
                          <div className="form-group">
                            <label>City</label>
                            <input
                              type="text"
                              className="form-control form-control-md"
                              name="city"
                              value={this.state.city}
                              onChange={this.onFormChange.bind(this)}
                              required
                            />
                          </div>
                          <div className="form-group">
                            <label>Country</label>
                            <input
                              type="text"
                              className="form-control form-control-md"
                              name="country"
                              value={this.state.country}
                              onChange={this.onFormChange.bind(this)}
                              required
                            />
                          </div>

                          <div className="form-group">
                            <label>Age</label>
                            <input
                              type="number"
                              className="form-control form-control-md"
                              name="age"
                              value={this.state.age}
                              onChange={this.onFormChange.bind(this)}
                              required
                            />
                          </div>
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
                          <div className="form-group">
                            <label>Profile Image</label>
                            {/* value={this.state.user_image} */}
                            <input
                              type="file"
                              className="form-control form-control-md"
                              name="user_image"
                              onChange={this.onFormChangeImg.bind(this)}
                              required
                            />
                          </div>

                          <button
                            type="submit"
                            className="btn btn-md btn-primary"
                          >
                            Sign UP{" "}
                          </button>
                          <NavLink
                            to="/login"
                            className="btn btn-md btn-primary ml-2"
                          >
                            Login
                          </NavLink>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Fragment>
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
export default connect(mapGetState, mapDispatchState)(Signup);
