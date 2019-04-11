import {
  GET_ERRORS,
  SET_CURRENT_USER,
  CLEAR_ERRORS,
  AUTHENTICATED,
  EMAIL_SENT
} from './types';
import axios from 'axios';

// register user
export const registerUser = userData => dispatch => {
  axios
    .post('http://localhost:5000/api/accounts/', userData)
    .then(res =>
      //redirect to email sent
      {
        dispatch({ type: EMAIL_SENT });
      }
    )
    .catch(err => {
      dispatch({ type: GET_ERRORS, payload: err.response.data });
    });
};

// sign in
export const loginUser = (userData, history) => dispatch => {
  axios
    .post('http://localhost:5000/api/accounts/', userData)
    .then(res => {
      dispatch({ type: AUTHENTICATED });
      localStorage.setItem('user', res.data.token);
      history.push('/');
    })
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};
