import axios from "../../config/axios";
import { apiUrl } from "../../helpers";
import { SET_POST_COMMENTS, comments_loading } from "../types/comment";
import { setPostList } from "./post";
import { setPodcast } from "./podcasts";

export const setComments = (comments) => {
  return {
    type: SET_POST_COMMENTS,
    payload: {
      comments,
    },
  };
};

export const togglePostCommentLoading = (post_id, isLoading) => {
  return {
    type: comments_loading,
    payload: {
      post_id,
      isLoading,
    },
  };
};

export const togglePodcastCommentsLoading = (podcast_id, isLoading) => {
  return {
    type: comments_loading,
    payload: {
      podcast_id,
      isLoading,
    },
  };
};

export const fetchPostComment = (post_id, page = 1) => {
  return (dispatch) => {
    dispatch(togglePostCommentLoading(post_id, true));
    axios
      .get(apiUrl(`posts/${post_id}/comments?page=${page}`))
      .then(({ data }) => {
        dispatch(setComments(data.data));
        dispatch(togglePostCommentLoading(post_id, false));
      })
      .catch(({ response }) => {
        console.log(response);
        dispatch(togglePostCommentLoading(post_id, false));
      });
  };
};

export const fetchPodcastComment = (podcast_id, page = 1) => {
  return (dispatch) => {
    dispatch(togglePodcastCommentsLoading(podcast_id, true));
    axios
      .get(apiUrl(`podcasts/${podcast_id}/comments?page=${page}`))
      .then(({ data }) => {
        dispatch(setComments(data.data));
        dispatch(togglePodcastCommentsLoading(podcast_id, false));
      })
      .catch(({ response }) => {
        console.log(response);
        dispatch(togglePodcastCommentsLoading(podcast_id, false));
      });
  };
};

export const fetchCommentFeed = (comment_id, page = 1) => {
  return (dispatch) => {
    dispatch(togglePostCommentLoading(comment_id, true));
    axios
      .get(apiUrl(`posts/get_comment_feed/${comment_id}?page=${page}`))
      .then(({ data }) => {
        dispatch(setComments(data.data));
        dispatch(togglePostCommentLoading(comment_id, false));
      })
      .catch(({ response }) => {
        console.log(response);
        dispatch(togglePostCommentLoading(comment_id, false));
      });
  };
};

export const addComment = (post_id, payload) => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      axios
        .post(apiUrl(`posts/${post_id}/add_comment`), payload)
        .then(({ data }) => {
          try {
            dispatch(setPostList([data.post]));
            dispatch(setComments(data.comments));
            resolve();
          } catch (e) {
            console.log(e);
          }
        })
        .catch(({ response }) => {
          reject();
          console.log(response);
        });
    });
  };
};

export const addPodcastComment = (post_id, payload) => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      axios
        .post(apiUrl(`podcasts/${post_id}/add_comment_to_podcast`), payload)
        .then(({ data }) => {
          try {
            dispatch(setPodcast(data.podcast));
            dispatch(setComments(data.comments));
            resolve();
          } catch (e) {
            console.log(e);
          }
        })
        .catch(({ response }) => {
          reject();
          console.log(response);
        });
    });
  };
};
