import axios from "../../config/axios";
import { SET_USER, SET_USER_LOADING } from "../types/user";
import { apiUrl } from "../../helpers";
import { toggleUserFollowees } from "./auth";

export const setUser = user => {
  return {
    type: SET_USER,
    payload: {
      user: user,
    },
  };
};

export const setUserLoading = (user_id, state) => {
  return {
    type: SET_USER_LOADING,
    payload: {
      user_id,
      state,
    },
  };
};

export const followUser = followee_id => {
  return function(dispatch) {
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
