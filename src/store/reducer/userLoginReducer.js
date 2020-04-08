import * as actionTypes from "../actions/actionTypes";
import { utility } from "../utility";
const initialState1 = {
  login: false,
  userInfo: {},
  products: [],
  postData: []
};

const userLoginReducer = (state = initialState1, { type, payload }) => {
  //   console.log(type);
  switch (type) {
    case actionTypes.LOGIN_STATUS:
      //   return {
      //     ...state,
      //     login: payload
      //   };
      return utility(state, { login: payload });

    case actionTypes.GET_USER_DATA:
      return utility(state, { userInfo: payload });
    case actionTypes.GET_POST_DATA:
      return utility(state, { postData: payload });

    default:
      return state;
  }
};

export default userLoginReducer;
