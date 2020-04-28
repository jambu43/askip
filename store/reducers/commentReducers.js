import { POST_COMMENT_LOADING, SET_POST_COMMENTS } from "../types/comment";

const initialState = {
  post_comment_loading: {},
  post_comments: {},
};

export const commentReducers = (state = initialState, { type, payload }) => {
  switch (type) {
    case POST_COMMENT_LOADING:
      return {
        ...state,
        post_comment_loading: {
          ...state.post_comment_loading,
          [payload.post_id]: payload.isLoading,
        },
      };
    case SET_POST_COMMENTS:
      let setPostComments = {};

      payload.comments.forEach((item) => {
        setPostComments[item.id] = item;
      });

      return {
        ...state,
        post_comments: {
          ...state.post_comments,
          ...setPostComments,
        },
      };
    default:
      return state;
  }
};
