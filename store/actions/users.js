import axios from "../../config/axios";
import {
  SET_USER,
  SET_USER_LOADING,
  SET_USERS,
  SET_CURRENT_USER_FOLLOWEES,
  SET_CURRENT_USER_FOLLOWERS,
  TOGGLE_CURRENT_USER_FOLLOWEES_LOADING,
  TOGGLE_CURRENT_USER_FOLLOWERS_LOADING,
} from "../types/user";
import { apiUrl } from "../../helpers";
import { toggleUserFollowees } from "./auth";
import { togglePostLiking, setPosts, setPostList } from "./post";

export const setUser = (user) => {
  return {
    type: SET_USER,
    payload: {
      user: user,
    },
  };
};

export const setUsers = (users) => {
  return {
    type: SET_USERS,
    payload: {
      user: users,
    },
  };
};

export const setCurrentUserFollowees = (users) => {
  return {
    type: SET_CURRENT_USER_FOLLOWEES,
    payload: {
      users: users,
    },
  };
};

export const setCurrentUserFollowers = (users) => {
  return {
    type: SET_CURRENT_USER_FOLLOWERS,
    payload: {
      users: users,
    },
  };
};

export const setUserLoading = (user_id, isLoading) => {
  return {
    type: SET_USER_LOADING,
    payload: {
      user_id,
      isLoading,
    },
  };
};

export const toggleCurrentUserFolloweesLoading = (isLoading) => {
  return {
    type: TOGGLE_CURRENT_USER_FOLLOWEES_LOADING,
    payload: {
      isLoading,
    },
  };
};

export const toggleCurrentUserFollowersLoading = (isLoading) => {
  return {
    type: TOGGLE_CURRENT_USER_FOLLOWERS_LOADING,
    payload: {
      isLoading,
    },
  };
};

export const updateUserToken = (expo_token) => {
  return function (dispatch) {
    return new Promise((resolve, reject) => {
      axios
        .post(apiUrl(`profile/update_user_token`), { token: expo_token })
        .then(() => {
          resolve();
        })
        .catch(({ response }) => {
          reject();
        });
    });
  };
};
export const followUser = (followee_id) => {
  return function (dispatch) {
    return new Promise((resolve, reject) => {
      axios
        .post(apiUrl(`profile/toggle_follow_user/${followee_id}`))
        .then(({ data }) => {
          dispatch(toggleUserFollowees(followee_id));
          resolve();
        })
        .catch(({ response }) => {
          console.log(response);
          reject();
        });
    });
  };
};

export const fetchUserById = (user_id) => {
  return function (dispatch) {
    dispatch(setUserLoading(user_id, true));
    axios
      .get(apiUrl(`users/${user_id}`))
      .then(({ data }) => {
        dispatch(setUser(data.data));
        dispatch(setUserLoading(user_id, false));
      })
      .catch(({ response }) => {
        console.log(response);
        dispatch(setUserLoading(user_id, false));
      });
  };
};

export const fetchUserFollowers = (page = 1) => {
  return function (dispatch) {
    dispatch(toggleCurrentUserFollowersLoading(true));
    axios
      .get(apiUrl(`profile/followers?page=${page}`))
      .then(({ data }) => {
        dispatch(setCurrentUserFollowers(data.data));
        dispatch(toggleCurrentUserFollowersLoading(false));
      })
      .catch(({ response }) => {
        console.log("response", response);
        dispatch(toggleCurrentUserFollowersLoading(false));
      });
  };
};

export const fetchUserFollowees = (page = 1) => {
  return function (dispatch) {
    dispatch(toggleCurrentUserFolloweesLoading(true));
    axios
      .get(apiUrl(`profile/followees?page=${page}`))
      .then(({ data }) => {
        dispatch(setCurrentUserFollowees(data.data));
        dispatch(toggleCurrentUserFolloweesLoading(false));
      })
      .catch(({ response }) => {
        console.log(response);
        dispatch(toggleCurrentUserFolloweesLoading(false));
      });
  };
};

export const togglePostConfirmation = (post_id) => {
  return function (dispatch) {
    dispatch(togglePostLiking(post_id, true));
    axios
      .post(apiUrl(`posts/${post_id}/toggle_post_confirmation`))
      .then(({ data }) => {
        try {
          dispatch(setPostList([data.data]));
        } catch (e) {
          console.log(e);
        }
        dispatch(togglePostLiking(post_id, false));
      })
      .catch(({ response }) => {
        dispatch(togglePostLiking(post_id, false));
      });
  };
};

export const togglePostInvalidation = (post_id) => {
  return function (dispatch) {
    dispatch(togglePostLiking(post_id, true));
    axios
      .post(apiUrl(`posts/${post_id}/toggle_post_invalidation`))
      .then(({ data }) => {
        dispatch(setPostList([data.data]));
        dispatch(togglePostLiking(post_id, false));
      })
      .catch(({ response }) => {
        console.log(response);
        dispatch(togglePostLiking(post_id, false));
      });
  };
};

export const fetchTrends = (page) => {
  return () => {
    return new Promise((resolve, reject) => {
      axios
        .get(apiUrl(`users/trends?page=${page}`))
        .then(({ data }) => {
          resolve(data.data);
        })
        .catch(({ response }) => {
          console.log(response);
        });
    });
  };
};

export const searchUsers = (keywords, page) => {
  return () => {
    return new Promise((resolve, reject) => {
      axios
        .get(apiUrl(`users/search/${keywords}?page=${page}`))
        .then(({ data }) => {
          resolve(data.data);
        })
        .catch(({ response }) => {
          console.log(response);
        });
    });
  };
};
