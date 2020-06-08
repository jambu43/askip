import axios from "../../config/axios";
import {
  TOGGLE_POST_LIST_LOADING,
  TOGGLE_POST_LOADING,
  SET_POST_LIST,
  SET_POST,
  TOGGLE_POST_CREATING,
  SET_USERS_POSTS,
  TOGGLE_USERS_POSTS_LOADING,
  TOGGLE_POST_LIKING,
  TOGGLE_DELETED_POST,
  REMOVE_POST,
} from "../types/post";

import { apiUrl } from "../../helpers";
import { SET_USER_PUBLICATION_RELEASE } from "../types/auth";

export const togglePostListLoading = () => {
  return {
    type: TOGGLE_POST_LIST_LOADING,
  };
};
export const toggleDeletedPost = (post_id) => {
  return {
    type: TOGGLE_DELETED_POST,
    payload: {
      post_id,
    },
  };
};

export const togglePostCreating = (state) => {
  return {
    type: TOGGLE_POST_CREATING,
    payload: {
      post_creating: state,
    },
  };
};

export const setPostList = (posts, cleanFirst) => {
  return {
    type: SET_POST_LIST,
    payload: {
      posts,
      cleanFirst,
    },
  };
};

export const removePost = (post_id) => {
  return {
    type: REMOVE_POST,
    payload: {
      post_id,
    },
  };
};

export const togglePostLoading = (post_id, state) => {
  return {
    type: TOGGLE_POST_LOADING,
    payload: {
      post_id,
      state,
    },
  };
};

export const togglePostLiking = (post_id, state) => {
  return {
    type: TOGGLE_POST_LIKING,
    payload: {
      post_id,
      state,
    },
  };
};

export const setPosts = (posts) => {
  return {
    type: SET_POST,
    payload: {
      posts,
    },
  };
};

export const setUsersPosts = (user_id, posts) => {
  return {
    type: SET_USERS_POSTS,
    payload: {
      user_id,
      posts,
    },
  };
};

export const toggleUsersPostsLoading = (user_id, isLoading) => {
  return {
    type: TOGGLE_USERS_POSTS_LOADING,
    payload: {
      user_id,
      isLoading,
    },
  };
};

export const setUserPublicationRelease = (posts) => {
  return {
    type: SET_USER_PUBLICATION_RELEASE,
    payload: {
      publication_releases: posts,
    },
  };
};

export const fetchPosts = (page = 1) => {
  return (dispatch) => {
    dispatch(togglePostListLoading());
    axios
      .get(apiUrl(`posts/feed?page=${page}`))
      .then(({ data }) => {
        dispatch(setPostList(data.data, page === 1));
        dispatch(togglePostListLoading());
      })
      .catch(({ response }) => {
        console.log(response);
        dispatch(togglePostListLoading());
      });
  };
};

export const fetchPostById = (post_id) => {
  return (dispatch) => {
    axios
      .get(apiUrl(`posts/${post_id}`))
      .then(({ data }) => {
        dispatch(setPostList([data.data]));
      })
      .catch(({ response }) => {
        console.log("fetchPostById", response);
      });
  };
};

export const fetchUserPosts = (user_id, page = 1) => {
  return (dispatch) => {
    dispatch(toggleUsersPostsLoading(user_id, true));
    axios
      .get(apiUrl(`profile/user_posts/${user_id}?page=${page}`))
      .then(({ data }) => {
        try {
          dispatch(setUsersPosts(user_id, data.data));
        } catch (error) {
          console.log(error);
        }
      })
      .catch(({ response }) => {
        console.log(response);
      })
      .finally(() => {
        dispatch(toggleUsersPostsLoading(user_id, false));
      });
  };
};

export const createPost = (formData) => {
  return (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    dispatch(togglePostCreating(true));
    return new Promise((resolve, reject) => {
      axios
        .post(apiUrl(`posts`), formData, config)
        .then((data) => {
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

export const sharePost = (post_id, formData) => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      axios
        .post(apiUrl(`posts/${post_id}/share`), formData)
        .then(({ data }) => {
          resolve();
        })
        .catch(({ response }) => {
          console.log(response);
          reject();
        });
    });
  };
};

export const updatePost = (post_id, formData) => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      axios
        .post(apiUrl(`posts/${post_id}/update`), formData)
        .then(({ data }) => {
          resolve();
        })
        .catch(({ response }) => {
          console.log(response);
          reject();
        });
    });
  };
};

export const deletePost = (post_id) => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      axios
        .post(apiUrl(`posts/${post_id}`), { _method: "DELETE" })
        .then(({}) => {
          resolve();
          try {
            dispatch(removePost(post_id));
            dispatch(toggleDeletedPost(post_id));
          } catch (e) {
            console.log(e);
          }
        })
        .catch(({ response }) => {
          console.log(response);
          reject();
        });
    });
  };
};

export const fetchPostLikers = (post_id, page) => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      axios
        .get(apiUrl(`posts/get_post_likers/${post_id}?page=${page}`))
        .then(({ data }) => {
          resolve(data.data);
        })
        .catch(({ response }) => {
          reject();
        });
    });
  };
};

export const fetchPostHaters = (post_id, page) => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      axios
        .get(apiUrl(`posts/get_post_haters/${post_id}?page=${page}`))
        .then(({ data }) => {
          resolve(data.data);
        })
        .catch(({ response }) => {
          reject();
        });
    });
  };
};
