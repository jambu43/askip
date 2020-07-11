import orderBy from "lodash/orderBy";
import { createSelector } from "reselect";
export const _getPostId = (state, props) => props.navigation.getParam("post_id");
export const _getPodcastId = (state, props) => props.navigation.getParam("podcast_id");
export const _getCommentId = (state, props) => props.navigation.getParam("comment_id");
export const _getComments = (state) => state.post_comment.comments;
export const _getCommentsLoading = (state) => state.post_comment.comments_loading;

export const getPostComments = createSelector(
  [_getPostId, _getComments],
  (post_id, post_comments) => {
    let comments = Object.values(post_comments);
    comments = comments.filter((item) => item.post_id == post_id);

    return orderBy(comments, "created_at", "desc");
  }
);

export const getPodcastComments = createSelector(
  [_getPodcastId, _getComments],
  (podcast_id, post_comments) => {
    let comments = Object.values(post_comments);
    comments = comments.filter((item) => item.podcast_id == podcast_id);
    return orderBy(comments, "created_at", "desc");
  }
);

export const getCommentFeed = createSelector(
  [_getCommentId, _getComments],
  (comment_id, post_comments) => {
    let comments = Object.values(post_comments);
    comments = comments.filter((item) => item.comment_id == comment_id);
    return orderBy(comments, "created_at", "asc");
  }
);

export const getPostCommentsLoading = createSelector(
  [_getPostId, _getCommentsLoading],
  (post_id, comments_loading) => {
    return comments_loading[post_id] ? comments_loading[post_id] : false;
  }
);

export const getPodcastCommentsLoading = createSelector(
  [_getPodcastId, _getCommentsLoading],
  (podcast_id, comments_loading) => {
    return comments_loading[podcast_id] ? comments_loading[podcast_id] : false;
  }
);

export const getCommentById = createSelector(
  [_getCommentId, _getComments],
  (comment_id, post_comments) => {
    return post_comments[comment_id];
  }
);
