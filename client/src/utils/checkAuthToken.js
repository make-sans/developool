import jwt_decode from 'jwt-decode';
import store from '../store';
import { SET_CURRENT_USER } from '../actions/types';
import setAuthToken from './setAuthToken';

export default function checkAuthToken() {
  let isAuthenticated = false;
  let decoded = {};
  //checking the JWT token in web storage
  if (localStorage.jwtToken) {
    try {
      decoded = jwt_decode(localStorage.jwtToken);
      const currentTime = Date.now() / 1000;
      if (decoded.exp < currentTime) {
        //the token is expired
        isAuthenticated = false;
      } else {
        //the token is valid and not expired
        setAuthToken(localStorage.jwtToken);
        isAuthenticated = true;
      }
    } catch {
      //error in decoding the token - not valid
      isAuthenticated = false;
    }
  }
  if (!isAuthenticated && store.getState().auth.isAuthenticated) {
    store.dispatch({ type: SET_CURRENT_USER, payload: {} });
    localStorage.removeItem('jwtToken');
    setAuthToken(false);
  }
  if (isAuthenticated && !store.getState().auth.isAuthenticated) {
    store.dispatch({ type: SET_CURRENT_USER, payload: decoded });
  }
  return isAuthenticated;
}
