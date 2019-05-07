import axios from 'axios';
import {
  GET_ERRORS,
  GET_PROJECT,
  GET_PROJECTS,
  GET_USER_PROJECTS,
  PROJECT_LOADING,
  DELETE_PROJECT
} from './types';
import { API_URL } from '../constants/index';

//create a project
export const createProject = (projectData, history) => dispatch => {
  axios
    .post(`${API_URL}/project`, projectData)
    .then(res => history.push(`/project/${res.data._id}`))
    .catch(err => {
      dispatch({ type: GET_ERRORS, payload: err.response.data });
    });
};
//get a project by id
export const getProject = id => dispatch => {
  dispatch({ type: PROJECT_LOADING });
  axios
    .get(`${API_URL}/project/${id.toString()}`)
    .then(res => dispatch({ type: GET_PROJECT, payload: res.data }))
    .catch(err => {
      dispatch({ type: GET_PROJECT, payload: null });
    });
};

//get projects using filters
export const filterProjects = params => dispatch => {
  dispatch({ type: PROJECT_LOADING });
  axios
    .get(`${API_URL}/project`, { params })
    .then(res => {
      dispatch({ type: GET_PROJECTS, payload: res.data });
    })
    .catch(err => {
      dispatch({ type: GET_PROJECTS, payload: null });
    });
};

//get a list of projects
export const getProjects = () => dispatch => {
  dispatch({ type: PROJECT_LOADING });
  axios
    .get(`${API_URL}/project`)
    .then(res => dispatch({ type: GET_PROJECTS, payload: res.data }))
    .catch(err => {
      dispatch({ type: GET_PROJECTS, payload: null });
    });
};

//get all user created projects
export const getUserProjects = () => dispatch => {
  dispatch({ type: PROJECT_LOADING });
  axios
    .get(`${API_URL}/accounts/projects`)
    .then(res => dispatch({ type: GET_USER_PROJECTS, payload: res.data }))
    .catch(err => {
      dispatch({ type: GET_USER_PROJECTS, payload: null });
    });
};

//edit a project
export const editProject = (id, projectData, history) => dispatch => {
  axios
    .put(`${API_URL}/project/${id.toString()}`, projectData)
    .then(res => history.push(`/project/${res.data._id}`))
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

//delete a project
export const deleteProject = (id, history) => dispatch => {
  axios
    .delete(`${API_URL}/project/${id.toString()}`)
    .then(res => {
      dispatch({ type: DELETE_PROJECT, payload: id });
      history.push('/projects');
    })
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

//join a project
export const joinProject = proj_id => dispatch => {
  axios
    .post(`${API_URL}/project/join/${proj_id.toString()}`)
    .then(res => dispatch({ type: GET_PROJECT, payload: res.data }))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: { id: proj_id, ...err.response.data }
      })
    );
};
//leave a project
export const leaveProject = proj_id => dispatch => {
  axios
    .post(`${API_URL}/project/leave/${proj_id.toString()}`)
    .then(res => dispatch({ type: GET_PROJECT, payload: res.data }))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: { id: proj_id, error: err.response.data }
      })
    );
};
