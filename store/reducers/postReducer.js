import {
  TOGGLE_POST_LOADING,
  TOGGLE_POST_LIST_LOADING,
  SET_POST_LIST,
  TOGGLE_POST_CREATING,
} from "../types/post";

const initialState = {
  post_list: {},
  post_list_loading: false,
  post_loading: {},
  post_creating: false,
};

export const postReducers = (state = initialState, { type, payload }) => {
  switch (type) {
    case TOGGLE_POST_CREATING:
      return {
        ...state,
        post_creating: payload.post_creating,
      };
    case TOGGLE_POST_LIST_LOADING:
      return {
        ...state,
        post_list_loading: !state.post_list_loading,
      };
    case TOGGLE_POST_LOADING:
      return {
        ...state,
        post_loading: {
          ...state.post_loading,
          ...{ [payload.post_id]: payload.state },
        },
      };
    case SET_POST_LIST:
      let setPostList = {};
      payload.posts.forEach(item => {
        setPostList[item.id] = item;
      });
      console.log(setPostList);
      return {
        ...state,
        post_list: {
          ...state.post_list,
          ...setPostList,
        },
      };
    default:
      return state;
  }
};
