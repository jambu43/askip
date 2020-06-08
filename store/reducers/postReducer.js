import {
  TOGGLE_POST_LOADING,
  TOGGLE_POST_LIST_LOADING,
  SET_POST_LIST,
  TOGGLE_POST_CREATING,
  TOGGLE_USERS_POSTS_LOADING,
  SET_USERS_POSTS,
  TOGGLE_POST_LIKING,
  TOGGLE_DELETED_POST,
  REMOVE_POST,
} from "../types/post";

const initialState = {
  post_list: {},
  post_list_loading: false,
  post_loading: {},
  post_liking: {},
  deleted_posts: [],
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
    case TOGGLE_POST_LIKING:
      return {
        ...state,
        post_liking: {
          ...state.post_liking,
          ...{ [payload.post_id]: payload.state },
        },
      };
    case TOGGLE_DELETED_POST:
      return {
        ...state,
        deleted_posts: [...state.deleted_posts, payload.post_id],
      };
    case REMOVE_POST:
      let oldPostList = Object.values(state.post_list);
      let oldUserPostList = Object.values(state.users_posts);
      let setPostList = {};
      let setUsersPosts = {};

      oldPostList.forEach((item) => {
        if (item.id != payload.post_id) {
          setPostList[item.id] = item;
        }
      });

      oldUserPostList.forEach((item) => {
        if (item.id != payload.post_id) {
          setUsersPosts[item.id] = item;
        }
      });

      return {
        ...state,
        post_list: {
          ...setPostList,
        },
        users_posts: {
          ...setUsersPosts,
        },
      };
    case SET_POST_LIST: {
      let setPostList = {};
      let oldPostList = payload.cleanFirst ? {} : state.post_list;
      let oldUserPostList = payload.cleanFirst ? {} : state.users_posts;
      let setUsersPosts = {
        ...state.users_posts,
      };

      payload.posts.forEach((item) => {
        let oldPost = state.post_list[item.id] ? state.post_list[item.id] : {};
        let newPost = {
          ...oldPost,
          ...item,
        };

        setPostList[item.id] = newPost;
        /**
         * To handle case when a post is in both user feed and explorer.
         */
        let authorId = oldPost.author ? oldPost.author.id : null;
        if (setUsersPosts[authorId] && setUsersPosts[authorId][item.id]) {
          setUsersPosts[authorId][item.id] = newPost;
        }
      });

      return {
        ...state,
        post_list: {
          ...oldPostList,
          ...setPostList,
        },
        users_posts: {
          ...oldUserPostList,
          ...setUsersPosts,
        },
      };
    }
    case TOGGLE_USERS_POSTS_LOADING:
      let toggleUsersPostsLoading = { [payload.user_id]: payload.isLoading };
      return {
        ...state,
        users_posts_loading: {
          ...state.users_posts_loading,
          ...toggleUsersPostsLoading,
        },
      };
    case SET_USERS_POSTS: {
      let setUsersPosts = {};
      let setPostList = {};
      payload.posts.forEach((item) => {
        let oldPost = state.users_posts[item.id] ? state.users_posts[item.id] : {};
        setUsersPosts[item.id] = {
          ...oldPost,
          ...item,
        };

        /**
         * To handle case when a post is in both user feed and explorer.
         */
        if (state.post_list[item.id]) {
          setPostList[item.id] = {
            ...oldPost,
            ...item,
          };
        }
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
        post_list: {
          ...state.post_list,
          ...setPostList,
        },
      };
    }
    default:
      return state;
  }
};
