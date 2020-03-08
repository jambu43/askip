import { sortBy } from "lodash/sortBy";
import { createSelector } from "reselect";

export const _getPosts = state => state.post.post_list;

export const getPosts = createSelector([_getPosts], posts => {
  let posts = Object.values(posts);
  return sortBy(posts, created_at);
});
