import { AUTHENTICATED } from "../actions/types";

const initialState = {
  isAuthenticated: false,
  user: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "SIMPLE_ACTION":
      return {
        result: action.payload
      };
    case AUTHENTICATED:
      return { ...state, isAuthenticated: true };
    case "LOGIN_FAILURE":
      return {

      };
    case "LOGOUT":
      return {

      };
    default:
      return state;
  }
};
