import { comments_loading, SET_POST_COMMENTS } from "../types/comment";

const initialState = {
  comments_loading: {},
  post_comments: {},
};

export const commentReducers = (state = initialState, { type, payload }) => {
  switch (type) {
    case comments_loading:
      return {
        ...state,
        comments_loading: {
          ...state.comments_loading,
          [payload.post_id]: payload.isLoading,
        },
      };
    case SET_POST_COMMENTS:
      let setComments = {};

      payload.comments.forEach((item) => {
        setComments[item.id] = item;
      });

      return {
        ...state,
        post_comments: {
          ...state.post_comments,
          ...setComments,
        },
      };
    default:
      return state;
  }
};
