import { SET_USER } from "../types/user";

export const setUser = user => {
  return {
    type: SET_USER,
    payload: {
      user,
    },
  };
};
