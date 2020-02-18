import Axios from "axios";
import server_url from "../../api";

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
                    // console.log(dt);
                    localStorage.setItem("userData", JSON.stringify(dt[0]));
                    localStorage.setItem("email", dt[0].email);
                    dispatch(loginUser(dt[0]));
                    dispatch(loginUserSt(true));
                })
                .catch(error => {
                    console.log("error");
                });
        }
    };
};


const loginUser = userObj => ({
    type: "GET_USER_DATA",
    payload: userObj
});

const loginUserSt = userObj => ({
    type: "LOGIN_ST",
    payload: userObj
});