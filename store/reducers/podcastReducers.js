import {
  SET_PODCAST,
  SET_PODCASTS,
  SET_LATEST_PODCAST,
  TOGGLE_PODCASTS_LOADING,
  TOGGLE_PODCAST_LOADING,
} from "../types/podcast";
const initialState = {
  podcasts: [],
  podcasts_loading: false,
  podcast_loading: {},
  latest_podcast: null,
};

export function podcastReducers(state = initialState, { payload, type }) {
  switch (type) {
    case SET_PODCASTS:
      return {
        ...state,
        podcasts: [...payload.podcasts],
      };
    case SET_PODCAST:
      return {
        ...state,
        podcasts: [...payload.podcasts],
      };
    case TOGGLE_PODCASTS_LOADING:
      return {
        ...state,
        podcasts_loading: !state.podcasts_loading,
      };
    case SET_LATEST_PODCAST:
      return {
        ...state,
        latest_podcast: payload.podcast,
      };
    case TOGGLE_PODCAST_LOADING:
      return {
        ...state,
        podcast_loading: {
          ...state.podcast_loading,
          [payload.podcast.id]: state.podcast_loading[payload.podcast.id] ? false : true,
        },
      };
    default:
      return state;
  }
}
