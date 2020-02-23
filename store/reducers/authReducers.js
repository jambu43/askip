import {
  TOGGLE_HAS_LOGIN_ERRORS,
  TOGGLE_IS_LOGGING_IN,
  SET_AUTH_USER,
  SET_TOKEN,
  SET_IS_LOGGED_IN,
  SET_LOGIN_ERRORS,
  TOGGLE_USER_FOLLOWEES,
  TOGGLE_PUBLICATION_RELEASES_READ,
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
    case TOGGLE_USER_FOLLOWEES:
      try {
        let followeeIdExist = state.user.followees_ids.includes(action.payload.followee_id);
        let followeesIds = !followeeIdExist
          ? [...state.user.followees_ids, action.payload.followee_id]
          : state.user.followees_ids.filter(item => item.id == action.payload.followee_id);
        return {
          ...state,
          user: {
            ...state.user,
            followees_ids: followeesIds,
          },
        };
      } catch (e) {
        console.log(e);
      }
      break;
    case TOGGLE_PUBLICATION_RELEASES_READ:
      try {
        let publicationReleaseIdExist = state.user.publication_releases_read.includes(
          action.payload.publication_release_id.toString()
        );
        let publicationReleaseIds = !publicationReleaseIdExist
          ? [...state.user.publication_releases_read, action.payload.publication_release_id]
          : state.user.publication_releases_read.filter(
              item => item != action.payload.publication_release_id
            );
        return {
          ...state,
          user: {
            ...state.user,
            publication_releases_read: publicationReleaseIds,
          },
        };
      } catch (e) {
        console.log(e);
      }
      break;
  }

  return state;
};
