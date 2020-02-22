import { createSelector } from "reselect";

export const getUserId = (state, props) => props.navigation.getParam("user_id");

const getUsers = (state, props) => state.user.users;
const getUserLoading = (state, props) => state.user.userLoading;

export const getUserById = createSelector([getUserId, getUsers], (userId, users) => {
  return users.find(item => item.id === userId);
});

export const isUserLoading = createSelector([getUserLoading, getUserId], (userLoading, userId) => {
  if (!userLoading) {
    return true;
  }
  return userLoading[userId] ? userLoading[userId] : false;
});
