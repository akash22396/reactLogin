import Axios from "axios";
import server_url from "../../api";
import * as actionTypes from "./actionTypes";

export const userLoginAction = user => {
  return dispatch => {
    let token = localStorage.getItem("token");
    let form = {
      token: `br ${token}`
    };
    if (token === null) {
      return dispatch(loginUser(""));
    } else {
      return Axios.post(server_url + `/user/userDetails`, form)
        .then(res => {
          const dt = res.data;

          if (dt !== "err") {
            localStorage.setItem("userData", JSON.stringify(dt[0]));
            localStorage.setItem("email", dt[0].email);
            dispatch(loginUser(dt[0]));
            dispatch(loginUserSt(true));
          }
          // console.log(dt);
        })
        .catch(error => {
          console.log("error");
          dispatch(loginUserSt(false));
        });
    }
  };
};

const loginUser = userObj => ({
  type: actionTypes.GET_USER_DATA,
  payload: userObj
});

const loginUserSt = userObj => ({
  type: actionTypes.LOGIN_STATUS,
  payload: userObj
});
