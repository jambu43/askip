import { SET_USER, SET_USER_LOADING } from "../types/user";

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
