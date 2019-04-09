import { combineReducers } from "redux";
import authReducer from "./rootReducer";
import errorReducer from "./errorReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer
});
