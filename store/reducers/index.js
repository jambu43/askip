import { combineReducers } from "redux";
import { authReducers } from "./authReducers";
import { magazinesReducer } from "./magazinesReducer";
import { podcastReducers } from "./podcastReducers";
import { articleReducers } from "./articleReducers";
import { userReducer } from "./userReducer";
export default combineReducers({
	auth: authReducers,
	magazine: magazinesReducer,
	podcast: podcastReducers,
	article: articleReducers,
	user: userReducer
});
