import {
  GET_ERRORS,
  SET_CURRENT_USER,
  SERVER_ERROR,
  EMAIL_SENT,
  CONFIRM_SUCCESSFUL
} from './types';
import setAuthToken from '../utils/setAuthToken';

import axios from 'axios';
import jwt_decode from 'jwt-decode';

import { API_URL } from '../constants/index';

// register user
export const registerUser = userData => dispatch => {
  axios
    .post(`${API_URL}/register`, userData)
    .then(res =>
      //redirect to email sent
      {
        dispatch({ type: EMAIL_SENT });
      }
    )
    .catch(err => {
      if (err.response) {
        dispatch({ type: GET_ERRORS, payload: err.response.data });
      } else {
        dispatch({ type: SERVER_ERROR });
      }
    });
};

// sign in
export const loginUser = userData => dispatch => {
  axios
    .post(`${API_URL}/auth`, userData)
    .then(res => {
      const token = res.data;
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
    .catch(err => {
      if (err.response) {
        dispatch({ type: GET_ERRORS, payload: err.response.data });
      } else {
        dispatch({ type: SERVER_ERROR });
      }
    });
};

//confirm email
export const confirmEmail = token => dispatch => {
  axios
    .get(`${API_URL}/register/confirm/${token}`)
    .then(res => {
      dispatch({ type: CONFIRM_SUCCESSFUL, payload: {} });
    })
    .catch(err => {
      dispatch({ type: GET_ERRORS, payload: err.response.data });
    });
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
