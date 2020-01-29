import axios from "../../config/axios";
import { apiUrl } from "../../helpers";
import {
  TOGGLE_IS_LOGGING_IN,
  SET_TOKEN,
  SET_IS_LOGGED_IN,
  SET_USER,
  TOGGLE_HAS_LOGIN_ERRORS,
  SET_LOGIN_ERRORS,
} from "../types/auth";

export const toggleIsLoggingIn = () => {
  return {
    type: TOGGLE_IS_LOGGING_IN,
  };
};
export function logOutUser() {
  return function(dispatch) {
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
          resolve();
        })
        .catch(() => {
          reject();
        });
    });
  };
}

export function registerUser(payload) {
  return function(dispatch) {
    return new Promise((resolve, reject) => {
      axios
        .post(apiUrl("auth/register"), payload)
        .then(function({ data }) {
          dispatch({
            type: SET_TOKEN,
            payload: data.token,
          });

          dispatch({
            type: SET_IS_LOGGED_IN,
            payload: true,
          });

          dispatch({
            type: SET_USER,
            payload: data.user,
          });

          axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;

          resolve();
        })
        .catch(function({ response }) {
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
        .finally(function() {
          dispatch({
            type: TOGGLE_IS_LOGGING_IN,
          });
        });
    });
  };
}
