import { createSelector } from "reselect";
import { _getUserId } from "./user";

const _getPodcastId = (state, props) => props.navigation.getParam("podcast_id");
const _getPodcasts = (state) => state.podcast.podcasts;
const _getNowPlayingPodcastId = (state) => state.podcast.now_playing.podcast_id;

export const getPodcastById = createSelector(
  [_getPodcastId, _getPodcasts],
  (podcast_id, podcasts) => {
    return podcasts.find((item) => item.id === podcast_id);
  }
);

export const getPodcastByUserId = createSelector(
  [_getUserId, _getPodcasts],
  (user_id, podcasts) => {
    return podcasts.find((item) => item.user_id == user_id);
  }
);

export const getNowPlayingPodcastById = createSelector(
  [_getNowPlayingPodcastId, _getPodcasts],
  (podcast_id, podcasts) => {
    return podcasts.find((item) => item.id == podcast_id);
  }
);
