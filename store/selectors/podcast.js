import { createSelector } from "reselect";

const getPodcastId = (state, props) => props.navigation.getParam("podcast_id");
const getPodcasts = state => state.podcast.podcasts;

export const getPodcastById = createSelector(
  [getPodcastId, getPodcasts],
  (podcast_id, podcasts) => {
    return podcasts.find(item => item.id === podcast_id);
  }
);
