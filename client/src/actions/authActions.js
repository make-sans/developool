import {
  GET_ERRORS,
  SET_CURRENT_USER,
  CLEAR_ERRORS,
  AUTHENTICATED,
  EMAIL_SENT
} from './types';
import setAuthToken from '../utils/setAuthToken';

import axios from 'axios';
import jwt_decode from 'jwt-decode';

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
export const loginUser = userData => dispatch => {
  axios
    .post('http://localhost:5000/api/auth', userData)
    .then(res => {
      const { token } = res.data;
      //save to localstorage
      localStorage.setItem('jwtToken', token);
      //set token to auth header
      setAuthToken(token);
      //decode token to get user data
      const decoded = jwt_decode(token);
      //set current user
      dispatch(setCurrentUser(decoded));
      //
    })
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

//log user out
export const logoutUser = () => dispatch => {
  //remove token from localstrage
  localStorage.removeItem('jwtToken');
  //remove auth header for future requests
  setAuthToken(false);
  //set current user to {} which sets isAuth to false
  dispatch(setCurrentUser({}));
};

//set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};
