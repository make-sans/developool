import { AUTHENTICATED, GET_ERRORS } from "../actions/types";

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
    case GET_ERRORS:
      return {
        ...state, errors: action.payload
      };
    case AUTHENTICATED:
      return { ...state, isAuthenticated: true };
    case "LOGOUT":
      return {

      };
    default:
      return state;
  }
};
