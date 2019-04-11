import { AUTHENTICATED, GET_ERRORS, EMAIL_SENT } from '../actions/types';

const initialState = {
  isAuthenticated: false,
  user: {},
  emailSent: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SIMPLE_ACTION':
      return {
        result: action.payload
      };
    case GET_ERRORS:
      return {
        ...state,
        errors: action.payload
      };
    case AUTHENTICATED:
      return { ...state, isAuthenticated: true };
    case EMAIL_SENT:
      return {
        ...state,
        emailSent: true
      };
    case 'LOGOUT':
      return {};
    default:
      return state;
  }
};
