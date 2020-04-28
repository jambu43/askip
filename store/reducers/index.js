import { combineReducers } from "redux";
import { authReducers } from "./authReducers";
import { magazinesReducer } from "./magazinesReducer";
import { podcastReducers } from "./podcastReducers";
import { articleReducers } from "./articleReducers";
import { userReducer } from "./userReducer";
import { postReducers } from "./postReducer";
import { commentReducers } from "./commentReducers";
export default combineReducers({
  auth: authReducers,
  magazine: magazinesReducer,
  podcast: podcastReducers,
  article: articleReducers,
  user: userReducer,
  post: postReducers,
  post_comment: commentReducers,
});
