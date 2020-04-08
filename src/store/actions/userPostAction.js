import Axios from "axios";
import server_url from "../../api";
import * as actionTypes from "./actionTypes";

export const userPostAction = data => {
  return dispatch => {
    Axios.get(server_url + `/user/userPost`)
      .then(res => {
        if (res.data !== "err") {
          // console.log(res.data);
          dispatch(userPost(res.data));
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
};

const userPost = dt => ({
  type: actionTypes.GET_POST_DATA,
  payload: dt
});
