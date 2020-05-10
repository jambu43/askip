import { createSelector } from "reselect";
import { _getUserId } from "./user";

const getPodcastId = (state, props) => props.navigation.getParam("podcast_id");
const getPodcasts = (state) => state.podcast.podcasts;

export const getPodcastById = createSelector(
  [getPodcastId, getPodcasts],
  (podcast_id, podcasts) => {
    return podcasts.find((item) => item.id === podcast_id);
  }
);

export const getPodcastByUserId = createSelector([_getUserId, getPodcasts], (user_id, podcasts) => {
  return podcasts.find((item) => item.user_id == user_id);
});
