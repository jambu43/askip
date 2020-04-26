import orderBy from "lodash/orderBy";
import { createSelector } from "reselect";

export const _getPosts = (state) => state.post.post_list;
export const _getCurrentUserId = (state) => state.auth.user.id;
export const _getUsersPosts = (state) => state.post.users_posts;
export const _getUserId = (state, props) => props.navigation.getParam("user_id");
export const _getPostAuthorId = (state, props) => props.navigation.getParam("post_author_id");
export const _getPostId = (state, props) => props.navigation.getParam("post_id");

export const getPosts = createSelector([_getPosts], (posts) => {
  let postCollection = Object.values(posts);
  return orderBy(postCollection, "created_at", "desc");
});

export const getUsersPosts = createSelector(
  [_getUserId, _getUsersPosts, _getCurrentUserId],
  (user_id, users_posts, current_user_id) => {
    let userId = user_id ? user_id : current_user_id;
    let postCollection = users_posts[userId] ? Object.values(users_posts[userId]) : [];
    return orderBy(postCollection, "created_at", "desc");
  }
);

export const getPostById = createSelector([_getPostId, _getPosts], (post_id, posts) => {
  return posts[post_id] ? posts[post_id] : null;
});

export const getUserPostById = createSelector(
  [_getPostId, _getPostAuthorId, _getUsersPosts],
  (post_id, post_author_id, posts) => {
    let post = null;
    if (posts[post_author_id]) {
      post = posts[post_author_id][post_id] ? posts[post_author_id][post_id] : null;
    }
    return post;
  }
);
