import axios from 'axios';
import { GET_ERRORS } from './types';

//create a project
export const createProject = projectData => dispatch => {
  axios
    .post('http://localhost:5000/api/project/', projectData)
    .then(res => console.log(res))
    .catch(err => {
      dispatch({ type: GET_ERRORS, payload: err.response.data });
    });
};
