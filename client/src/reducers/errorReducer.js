import { GET_ERRORS, CLEAR_ERRORS, SERVER_ERROR } from '../actions/types';
const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case CLEAR_ERRORS:
      return {};
    case GET_ERRORS:
      return action.payload;
    case SERVER_ERROR:
      return { server_error: true };
    default:
      return state;
  }
}
