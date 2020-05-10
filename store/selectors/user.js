import orderBy from "lodash/orderBy";
import { createSelector } from "reselect";

export const _getUserId = (state, props) => props.navigation.getParam("user_id");

const _getUsers = (state, props) => state.user.users;
const _getUserFollowers = (state, props) => state.user.currentUserFollowers;
const _getUserFollowees = (state, props) => state.user.currentUserFollowees;
const _getUserLoading = (state, props) => state.user.userLoading;

export const getUserById = createSelector([_getUserId, _getUsers], (userId, users) => {
  return users[userId] ? users[userId] : null;
});

export const isUserLoading = createSelector(
  [_getUserLoading, _getUserId],
  (userLoading, userId) => {
    return userLoading[userId] ? userLoading[userId] : false;
  }
);

export const getUserFollowers = createSelector([_getUserFollowers], (followers) => {
  let followersCollection = Object.values(followers);
  return orderBy(followersCollection, "name", "asc");
});

export const getUserFollowees = createSelector([_getUserFollowees], (followees) => {
  let followeesCollection = Object.values(followees);
  return orderBy(followeesCollection, "name", "asc");
});
