import { combineReducers } from "redux";
import authReducer from "./rootReducer";

export default combineReducers({
  auth: authReducer
});
