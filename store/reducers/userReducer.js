import { SET_USER, SET_USER_LOADING, SET_USERS } from "../types/user";

const initialState = {
  users: {},
  userLoading: {},
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
    default:
      return state;
  }
};
