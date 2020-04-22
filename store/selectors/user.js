import { createSelector } from "reselect";

export const getUserId = (state, props) => props.navigation.getParam("user_id");

const getUsers = (state, props) => state.user.users;
const getUserLoading = (state, props) => state.user.userLoading;

export const getUserById = createSelector([getUserId, getUsers], (userId, users) => {
  return users[userId] ? users[userId] : null;
});

export const isUserLoading = createSelector([getUserLoading, getUserId], (userLoading, userId) => {
  return userLoading[userId] ? userLoading[userId] : false;
});
