import { SET_USER } from "../types/user";

const initialState = {
  users: [],
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
    default:
      return state;
  }
};
