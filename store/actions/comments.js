import axios from "../../config/axios";
import { apiUrl } from "../../helpers";
import { SET_POST_COMMENTS, POST_COMMENT_LOADING } from "../types/comment";

export const setPostComments = (comments) => {
  return {
    type: SET_POST_COMMENTS,
    payload: {
      comments,
    },
  };
};

export const togglePostCommentLoading = (post_id, isLoading) => {
  return {
    type: POST_COMMENT_LOADING,
    payload: {
      post_id,
      isLoading,
    },
  };
};

export const fetchPostComment = (post_id, page = 1) => {
  return (dispatch) => {
    dispatch(togglePostCommentLoading(post_id, true));
    axios
      .get(apiUrl(`posts/${post_id}/comments?page=${page}`))
      .then(({ data }) => {
        dispatch(setPostComments(data.data));
        dispatch(togglePostCommentLoading(post_id, false));
      })
      .catch(({ response }) => {
        console.log(response);
        dispatch(togglePostCommentLoading(post_id, false));
      });
  };
};

export const addComment = (post_id, payload) => {
  return (dispatch) => {
    axios
      .post(apiUrl(`posts/${post_id}/add_comment`), payload)
      .then(({ data }) => {
        console.log(data);
      })
      .catch(({ response }) => {
        console.log(response);
      });
  };
};
