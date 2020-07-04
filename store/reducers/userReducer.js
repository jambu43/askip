import {
  SET_USER,
  SET_USER_LOADING,
  SET_USERS,
  SET_CURRENT_USER_FOLLOWERS,
  TOGGLE_CURRENT_USER_FOLLOWERS_LOADING,
  SET_CURRENT_USER_FOLLOWEES,
  TOGGLE_CURRENT_USER_FOLLOWEES_LOADING,
  TOGGLE_USERS_LOADING,
} from "../types/user";

const initialState = {
  users: {},
  userLoading: {},
  usersLoading: false,
  currentUserFollowers: {},
  currentUserFollowersLoading: true,
  currentUserFollowees: {},
  currentUserFolloweesLoading: true,
};

export const userReducer = (state = initialState, { payload, type }) => {
  switch (type) {
    case SET_USER: {
      let setUser = { [payload.user.id]: payload.user };
      return {
        ...state,
        users: {
          ...state.users,
          ...setUser,
        },
      };
    }
    case SET_USER_LOADING: {
      return {
        ...state,
        userLoading: {
          ...state.userLoading,
          [payload.user_id]: payload.isLoading,
        },
      };
    }
    case SET_USERS:
      let setUsers = {};
      payload.users.map((item) => {
        setUsers[item.id] = item;
      });
      return {
        ...state,
        users: {
          ...state.users,
          ...setUsers,
        },
      };
    case SET_CURRENT_USER_FOLLOWERS:
      let setCurrentUserFollowers = {};
      payload.users.map((item) => {
        setCurrentUserFollowers[item.id] = item;
      });
      return {
        ...state,
        currentUserFollowers: {
          ...state.currentUserFollowers,
          ...setCurrentUserFollowers,
        },
      };
    case SET_CURRENT_USER_FOLLOWEES:
      let setCurrentUserFollowees = {};
      payload.users.map((item) => {
        setCurrentUserFollowees[item.id] = item;
      });
      return {
        ...state,
        currentUserFollowees: {
          ...state.currentUserFollowees,
          ...setCurrentUserFollowees,
        },
      };
    case TOGGLE_CURRENT_USER_FOLLOWERS_LOADING:
      return {
        ...state,
        currentUserFollowersLoading: payload.isLoading,
      };
    case TOGGLE_CURRENT_USER_FOLLOWEES_LOADING:
      return {
        ...state,
        currentUserFolloweesLoading: payload.isLoading,
      };
    case TOGGLE_USERS_LOADING:
      return {
        ...state,
        usersLoading: payload.isLoading,
      };
    default:
      return state;
  }
};
