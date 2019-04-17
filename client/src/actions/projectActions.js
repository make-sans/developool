import axios from 'axios';
import {
  GET_ERRORS,
  GET_PROJECT,
  GET_PROJECTS,
  PROJECT_LOADING
} from './types';

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

//get a list of projects
export const getProjects = () => dispatch => {
  dispatch({ type: PROJECT_LOADING });
  axios
    .get(`http://localhost:5000/api/projects/`)
    .then(res => dispatch({ type: GET_PROJECTS, payload: res.data }))
    .catch(err => {
      dispatch({ type: GET_PROJECTS, payload: null });
    });
};

//edit a project
export const editProject = (id, projectData, history) => dispatch => {
  axios
    .put(`http://localhost:5000/api/project/${id.toString()}`, projectData)
    .then(res => history.push(`/project/${res.data._id}`))
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};
