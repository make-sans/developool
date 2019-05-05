import axios from "axios";
import {
    GET_PROFILE,
    PROFILE_LOADING,
    GET_ERRORS,
} from "./types";

//get current profile
export const getCurrentProfile = () => dispatch => {
    dispatch(setProfileLoading());
    axios
        .get('http://localhost:5000/api/profile')
        .then(res => {
            dispatch({
                type: GET_PROFILE,
                payload: res.data
            });
        })
        .catch(err =>
            dispatch({
                type: GET_PROFILE,
                payload: {}
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
        .get(`http://localhost:5000/api/profile/${id}`)
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
export const createProfile = profileData => dispatch => {
    console.log(profileData)
    const body = { profile: profileData }
    axios
        .post("http://localhost:5000/api/profile", body)
        .then(res => {
            console.log(res.data)
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
        .put('http://localhost:5000/api/profile', profileData)
        .then(res =>
            history.push('/profile')
        )
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            }))
};