import { combineReducers } from 'redux';
import { authReducers } from './authReducers';
import { magazinesReducer } from './magazinesReducer';
import { podcastReducers } from './podcastReducers';
import { newspaperReducers } from './newpaperReducers';
export default combineReducers({
	auth: authReducers,
	magazine: magazinesReducer,
	podcast: podcastReducers,
	article: newspaperReducers
});