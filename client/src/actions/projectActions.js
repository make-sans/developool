import axios from 'axios';
import { GET_ERRORS, GET_PROJECT, PROJECT_LOADING } from './types';

//create a project
export const createProject = (projectData, history) => dispatch => {
  axios
    .post('http://localhost:5000/api/project/', projectData)
    .then(res => history.push(`/project/${res.data._id}`))
    .catch(err => {
      dispatch({ type: GET_ERRORS, payload: err.response.data });
    });
};
//get a project by id
export const getProject = id => dispatch => {
  dispatch({ type: PROJECT_LOADING });
  axios
    .get(`http://localhost:5000/api/project/${id.toString()}`)
    .then(res => dispatch({ type: GET_PROJECT, payload: res.data }))
    .catch(err => {
      dispatch({ type: GET_PROJECT, payload: null });
    });
};
