import { SET_USER, SET_USER_LOADING } from "../types/user";

const initialState = {
  users: [],
  userLoading: {},
};

export const userReducer = (state = initialState, { payload, type }) => {
  switch (type) {
    case SET_USER: {
      let userExists = state.users.find(item => item.id === payload.user.id);
      return {
        users: !userExists
          ? [...state.users, payload.user]
          : state.users.map(item => {
              return item.id === payload.user.id ? payload.user : item;
            }),
      };
    }
    case SET_USER_LOADING: {
      return {
        ...state,
        userLoading: {
          ...state.userLoading,
          [payload.user_id]: payload.state,
        },
      };
    }
    default:
      return state;
  }
};
