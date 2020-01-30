import { combineReducers } from "redux";
import { authReducers } from "./authReducers";
import { magazinesReducer } from "./magazinesReducer";
export default combineReducers({
  auth: authReducers,
  magazine: magazinesReducer,
});
