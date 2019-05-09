import axios from 'axios';
import { GET_PROFILE, PROFILE_LOADING, GET_ERRORS } from './types';

import { API_URL } from '../constants/index';

//get current profile
export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get(`${API_URL}/profile`)
    .then(res => {
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: null
      })
    );
};

//profile loading
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};

//get profile by id/username
export const getProfileById = id => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get(`${API_URL}/profile/${id}`)
    .then(res => {
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: null
      })
    );
};

//create profile
export const createProfile = (profileData, history) => dispatch => {
  console.log(profileData);
  const body = { profile: profileData };
  axios
    .post(`${API_URL}/profile`, body)
    .then(res => {
      history.push('/profile');
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//edit profile
export const editProfile = (profileData, history) => dispatch => {
  axios
    .put(`${API_URL}/profile`, profileData)
    .then(res => history.push('/profile'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
