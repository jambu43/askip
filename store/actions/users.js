import axios from "../../config/axios";
import { SET_USER, SET_USER_LOADING, SET_USERS } from "../types/user";
import { apiUrl } from "../../helpers";
import { toggleUserFollowees } from "./auth";

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

export const setUserLoading = (user_id, isLoading) => {
  return {
    type: SET_USER_LOADING,
    payload: {
      user_id,
      isLoading,
    },
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
