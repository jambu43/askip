import { createSelector } from "reselect";

export const _getPosts = state => state.post.post_list;

export const getPosts = createSelector([_getPosts], posts => {
  return Object.values(posts);
});
