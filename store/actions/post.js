import axios from '../../config/axios';
import {
	TOGGLE_POST_LIST_LOADING,
	TOGGLE_POST_LOADING,
	SET_POST_LIST,
	SET_POST,
	TOGGLE_POST_CREATING
} from '../types/post';

import { apiUrl } from '../../helpers';
import { SET_USER_PUBLICATION_RELEASE } from '../types/auth';

export const togglePostListLoading = () => {
	return {
		type: TOGGLE_POST_LIST_LOADING
	};
};

export const togglePostCreating = (state) => {
	return {
		type: TOGGLE_POST_CREATING,
		payload: {
			post_creating: state
		}
	};
};

export const setPostList = (posts) => {
	return {
		type: SET_POST_LIST,
		payload: {
			posts
		}
	};
};

export const togglePostLoading = (post_id, state) => {
	return {
		type: TOGGLE_POST_LOADING,
		payload: {
			post_id,
			state
		}
	};
};

export const setPosts = (posts) => {
	return {
		type: SET_POST,
		payload: {
			posts
		}
	};
};

export const setUserPublicationRelease = (posts) => {
	return {
		type: SET_USER_PUBLICATION_RELEASE,
		payload: {
			publication_releases: posts
		}
	};
};

export const fetchPosts = (page = 1) => {
	return (dispatch) => {
		dispatch(togglePostListLoading());
		axios
			.get(apiUrl('posts/feed'))
			.then(({ data }) => {
				dispatch(setPostList(data.data));
				dispatch(togglePostListLoading());
			})
			.catch(({ response }) => {
				console.log(response);
				dispatch(togglePostListLoading());
			});
	};
};

export const fetchPostId = (post_id) => {
	return (dispatch) => {
		dispatch(togglePostListLoading(post_id, true));
		axios
			.get(apiUrl(`posts/user/${post_id}`))
			.then(({ data }) => {
				dispatch(setPosts([ data.data ]));
			})
			.catch(({ response }) => {
				console.log(response);
			})
			.finally(() => {
				dispatch(togglePostListLoading(post_id, false));
			});
	};
};

export const fetchUserPost = (user_id) => {
	return (dispatch) => {
		dispatch(togglePostListLoading(user_id, true));
		axios
			.get(apiUrl(`profile/user_posts/${user_id}`))
			.then(({ data }) => {
				console.log(data);
				try {
					dispatch(setUserPublicationRelease([ data.data ]));
				} catch (error) {
					console.log(error);
				}
			})
			.catch(({ response }) => {
				console.log(response);
			})
			.finally(() => {
				dispatch(togglePostListLoading(user_id, false));
			});
	};
};

export const createPost = (formData) => {
	return (dispatch) => {
		const config = {
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		};
		dispatch(togglePostCreating(true));
		return new Promise((resolve, reject) => {
			axios
				.post(apiUrl(`posts`), formData, config)
				.then((data) => {
					console.log(data);
					resolve();
				})
				.catch((response) => {
					reject();
				})
				.finally(() => {
					dispatch(togglePostCreating(false));
				});
		});
	};
};