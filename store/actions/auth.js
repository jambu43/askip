import axios from "../../config/axios";
import { apiUrl } from "../../helpers";
import {
  TOGGLE_IS_LOGGING_IN,
  SET_TOKEN,
  SET_IS_LOGGED_IN,
  SET_AUTH_USER,
  TOGGLE_HAS_LOGIN_ERRORS,
  SET_LOGIN_ERRORS,
  TOGGLE_USER_FOLLOWEES,
  TOGGLE_PUBLICATION_RELEASES_READ,
  IS_USER_FETCHING,
  SET_USER_DATA,
} from "../types/auth";
import { setPostList } from "./post";
import { setNotifications } from "./notification";

export const toggleIsLoggingIn = () => {
  return {
    type: TOGGLE_IS_LOGGING_IN,
  };
};

export const isUserFetching = (_isUserFetching) => {
  return {
    type: IS_USER_FETCHING,
    payload: _isUserFetching,
  };
};

export const setUserData = (data) => {
  return {
    type: SET_USER_DATA,
    payload: {
      data,
    },
  };
};

export const toggleUserFollowees = (followee_id) => {
  return {
    type: TOGGLE_USER_FOLLOWEES,
    payload: {
      followee_id: followee_id.toString(),
    },
  };
};

export const togglePublicationReleasesRead = (publication_release_id) => {
  return {
    type: TOGGLE_PUBLICATION_RELEASES_READ,
    payload: {
      publication_release_id: publication_release_id.toString(),
    },
  };
};

export function logOutUser() {
  return function (dispatch) {
    return new Promise((resolve, reject) => {
      axios
        .post(apiUrl("auth/logout"))
        .then(() => {
          dispatch({
            type: SET_TOKEN,
            payload: null,
          });

          dispatch({
            type: SET_IS_LOGGED_IN,
            payload: false,
          });

          dispatch(setPostList([], true));
          dispatch(setNotifications([], true));
          resolve();
        })
        .catch(() => {
          reject();
        });
    });
  };
}

export function fetchMe() {
  return function (dispatch) {
    dispatch(isUserFetching(true));
    return new Promise((resolve, reject) => {
      axios
        .get(apiUrl("profile/me"))
        .then(function ({ data }) {
          dispatch({
            type: SET_AUTH_USER,
            payload: data.data,
          });

          resolve();
        })
        .catch(function ({ response }) {})
        .finally(function () {
          dispatch(isUserFetching(false));
        });
    });
  };
}

export const setAxiosToken = (token) => {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export function registerUser(payload) {
  return function (dispatch) {
    return new Promise((resolve, reject) => {
      axios
        .post(apiUrl("auth/register"), payload)
        .then(function ({ data }) {
          dispatch({
            type: SET_TOKEN,
            payload: data.access_token,
          });

          dispatch({
            type: SET_IS_LOGGED_IN,
            payload: true,
          });

          dispatch({
            type: SET_AUTH_USER,
            payload: data.user,
          });

          setAxiosToken(data.access_token);

          resolve();
        })
        .catch(function ({ response }) {
          dispatch({
            type: TOGGLE_HAS_LOGIN_ERRORS,
          });

          if (response) {
            dispatch({
              type: SET_LOGIN_ERRORS,
              payload: response.data.error,
            });
          } else {
            dispatch({
              type: SET_LOGIN_ERRORS,
              payload: "GENERAL_ERROR",
            });
          }
        })
        .finally(function () {
          dispatch({
            type: TOGGLE_IS_LOGGING_IN,
          });
        });
    });
  };
}

export const togglePublicationRelease = (publication_release_id) => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      axios
        .post(apiUrl(`publication_releases/${publication_release_id}/toggle_read`))
        .then((response) => {
          dispatch(togglePublicationReleasesRead(publication_release_id));
          resolve();
        })
        .catch(({ response }) => {
          console.log(response);
          reject();
        });
    });
  };
};
