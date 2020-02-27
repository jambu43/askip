import { TOGGLE_POST_LOADING, TOGGLE_POST_LIST_LOADING, SET_POST_LIST } from "../types/post";

const intialState = {
  post_list: [],
  post_list_loading: false,
  post_loading: {},
    
};

export const postReduceurs = (state = intialState, { type, payload }) => {
  switch (type) {
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
        return {
          ...state,
          post_list: [...payload.posts],
        };
      break
      default:
        return state;
  }
};