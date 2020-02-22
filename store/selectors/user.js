import { createSelector } from "reselect";

export const getUserId = (state, props) => props.navigation.getParam("user_id");

const getUsers = (state, props) => state.user.users;

export const getUserById = createSelector([getUserId, getUsers], (userId, users) => {
  return users.find(item => item.id === userId);
});
