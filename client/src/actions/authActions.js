import { GET_ERRORS, SET_CURRENT_USER, CLEAR_ERRORS, AUTHENTICATED } from "./types";
import axios from "axios";

// register user
export const registerUser = (userData, history) => dispatch => {
  axios
    .post("http://localhost:5000/api/users/register", userData)
    .then(res =>
      //redirect to email sent
      //redirect to login
      history.push("/login")
    )
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

// sign in
export const loginUser = (userData, history) => dispatch => {
  axios
    .post("http://localhost:5000/api/users/login", userData)
    .then(res => {
      dispatch({ type: AUTHENTICATED });
      localStorage.setItem("user", res.data.token);
      history.push("/");
    })
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
}
