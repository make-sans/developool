import {
  AUTHENTICATED,
  GET_ERRORS,
  EMAIL_SENT,
  SET_CURRENT_USER,
  CONFIRM_SUCCESSFUL
} from '../actions/types';
import isEmpty from '../utils/is-empty';
const initialState = {
  isAuthenticated: false,
  user: {},
  emailSent: false,
  emailConfirmed: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ERRORS:
      return {
        ...state,
        errors: action.payload
      };
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    case AUTHENTICATED:
      return { ...state, isAuthenticated: true };
    case EMAIL_SENT:
      return {
        ...state,
        emailSent: true
      };
    case CONFIRM_SUCCESSFUL:
      return {
        ...state, emailConfirmed: true
      }
    case 'LOGOUT':
      return {};
    default:
      return state;
  }
};
