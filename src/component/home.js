import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
// import Axios from 'axios'
// import server_url from '../api'
import * as actionTypes from "../store/actions/actionTypes";
import { userPostAction } from "../store/actions/index";
import Header from "../shared/header";
class home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMount: false
    };
  }
  componentDidMount() {
    // console.log(this.props.loginStatus)
    // this.props.userData();
    this.props.userPost();

    // console.log(this.props.getUserPost);
  }

  componentDidUpdate() {
    // console.log(this.props.loginStatus)
  }
  loginSt() {}
  render() {
    return (
      <Fragment>
        <Header />
        <section>
          <div className="container">
            <div className="row py-3">
              <div className="col-md-12">
                <p>
                  Home login status ::>{" "}
                  {this.props.loginStatus ? "true" : "fasle"}
                </p>

                {this.props.getUserPost ? (
                  this.props.getUserPost.map((res, i) => (
                    <p key={i}>{res.post}</p>
                  ))
                ) : (
                  <p>No Data found:(</p>
                )}

                <button type="button" onClick={() => this.props.addCount()}>
                  Add {this.props.count}
                </button>
              </div>
            </div>
          </div>
        </section>
        {/* <button type='button' onClick={this.loginSt.bind(this)}>Login</button> */}
      </Fragment>
    );
  }
}

const mapGetState = state => {
  return {
    loginStatus: state.usr.login,
    getUserData: state.usr.userInfo,
    getUserPost: state.usr.postData,
    count: state.ctr.count
  };
};

const mapDispatchState = dispatch => {
  return {
    login: data => dispatch({ type: actionTypes.LOGIN_STATUS, payload: data }),
    userData: data =>
      dispatch({ type: actionTypes.GET_USER_DATA, payload: data }),
    userPost: () => dispatch(userPostAction()),
    addCount: () => dispatch({ type: "ADD" })
  };
};

export default connect(mapGetState, mapDispatchState)(home);
