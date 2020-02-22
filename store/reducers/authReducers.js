import {
  TOGGLE_HAS_LOGIN_ERRORS,
  TOGGLE_IS_LOGGING_IN,
  SET_AUTH_USER,
  SET_TOKEN,
  SET_IS_LOGGED_IN,
  SET_LOGIN_ERRORS,
} from "../types/auth";

const initialState = {
  isLoggingIn: false,
  isLoggedIn: false,
  hasLoginErrors: false,
  loginErrors: null,
  token: null,
  user: {},
};

export const authReducers = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_HAS_LOGIN_ERRORS:
      return {
        ...state,
        hasLoginErrors: !state.hasLoginErrors,
      };
    case TOGGLE_IS_LOGGING_IN:
      return {
        ...state,
        isLoggingIn: !state.isLoggingIn,
      };

    case SET_IS_LOGGED_IN:
      return {
        ...state,
        isLoggedIn: action.payload,
      };
    case SET_AUTH_USER:
      return {
        ...state,
        user: action.payload,
      };
      break;

    case SET_TOKEN:
      return {
        ...state,
        token: action.payload,
      };
    case SET_LOGIN_ERRORS:
      return {
        ...state,
        loginErrors: action.payload,
      };
  }

  return state;
};
