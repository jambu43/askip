import axios from "../../config/axios";
import {
    TOGGLE_POST_LIST_LOADING,
    TOGGLE_POST_LOADING,
    SET_POST_LIST,
    SET_POST
} from "../types/post";

import { apiUrl } from "../../helpers";

export const togglePostListLoading = () => {
    return {
        type: TOGGLE_POST_LIST_LOADING,
    };
};

export const setpostList = posts => {
    return {
        type: SET_POST_LIST,
        payload: {
            posts,
        },
    };
};

export const togglePostLoading = (post_id, state) => {
    return {
        type: TOGGLE_POST_LOADING,
        payload: {
            post_id,
            state,
        }
        ,
    };
};

export const setPost = posts => {
  return {
    type: SET_POST,
    payload: {
      posts,
    },
  };
};

export const fetchLatestPost = () => {
  return dispatch => {
    dispatch(togglePostListLoading());
    axios
      .get(apiUrl("posts/getAllPost"))
      .then(({ data }) => {
        dispatch(setPost(data.data));
        dispatch(togglePostListLoading());
      })
      .catch(({ response }) => {
        dispatch(togglePostListLoading());
      })
  }
}

export const fetchPostId = post_id => {
  return dispatch => {
    dispatch(togglePostListLoading(post_id, true));
    axios
      .get(apiUrl(`posts/get/${post_id}`))
      .then(({ data }) => {
        dispatch(setPost([data.data]));
      })
      .catch(({ response }) => {
        console.log(response);
      })
      .finally(() => {
        dispatch(togglePostListLoading(post_id, false));
      });
  };

};