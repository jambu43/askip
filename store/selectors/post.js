import orderBy from "lodash/orderBy";
import { createSelector } from "reselect";

export const _getPosts = (state) => state.post.post_list;
export const _getUsersPosts = (state) => state.post.users_posts;
export const _getUserId = (state, props) => props.navigation.getParam("user_id");

export const getPosts = createSelector([_getPosts], (posts) => {
  let postCollection = Object.values(posts);
  return orderBy(postCollection, "created_at", "desc");
});

export const getUsersPosts = createSelector(
  [_getUserId, _getUsersPosts],
  (user_id, users_posts) => {
    let postCollection = users_posts[user_id] ? Object.values(users_posts[user_id]) : [];
    return orderBy(postCollection, "created_at", "desc");
  }
);
