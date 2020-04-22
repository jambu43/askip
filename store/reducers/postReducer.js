import {
  TOGGLE_POST_LOADING,
  TOGGLE_POST_LIST_LOADING,
  SET_POST_LIST,
  TOGGLE_POST_CREATING,
  TOGGLE_USERS_POSTS_LOADING,
  SET_USERS_POSTS,
} from "../types/post";

const initialState = {
  post_list: {},
  post_list_loading: false,
  post_loading: {},
  post_creating: false,
  /**
   * {List<String, Array<Object>>}
   */
  users_posts: {},
  users_posts_loading: {},
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
      payload.posts.forEach((item) => {
        setPostList[item.id] = item;
      });
      return {
        ...state,
        post_list: {
          ...state.post_list,
          ...setPostList,
        },
      };
    case TOGGLE_USERS_POSTS_LOADING:
      let toggleUsersPostsLoading = { [payload.user_id]: payload.isLoading };
      return {
        ...state,
        users_posts_loading: {
          ...state.users_posts_loading,
          ...toggleUsersPostsLoading,
        },
      };
    case SET_USERS_POSTS:
      let setUsersPosts = {};
      payload.posts.forEach((item) => {
        setUsersPosts[item.id] = item;
      });

      if (state.users_posts[payload.user_id]) {
        setUsersPosts = {
          ...setUsersPosts,
          ...state.users_posts[payload.user_id],
        };
      }

      return {
        ...state,
        users_posts: {
          ...state.users_posts,
          [payload.user_id]: {
            ...setUsersPosts,
          },
        },
      };
    default:
      return state;
  }
};
