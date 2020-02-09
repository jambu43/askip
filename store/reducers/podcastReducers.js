import {
  SET_PODCAST,
  SET_PODCASTS,
  SET_LATEST_PODCAST,
  TOGGLE_PODCASTS_LOADING,
  TOGGLE_PODCAST_LOADING,
  SET_NOW_PLAYING_SOUND_OBJECT,
  SET_NOW_PLAYING_PLAY_BACK_STATUS,
  SET_NOW_PLAYING,
} from "../types/podcast";
const initialState = {
  podcasts: [],
  podcasts_loading: false,
  podcast_loading: {},
  latest_podcast: null,
  now_playing: {
    podcast_id: null,
    soundObject: null,
    playbackStatus: {
      isPlaying: false,
      isBuffering: false,
      didJustFinish: false,
      durationMillis: 0,
      playableDurationMillis: 0,
      positionMillis: 0,
    },
  },
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
      let latestPodcastExists = state.podcasts.find(item => item.id === payload.podcast.id);
      let newPodcastList = !latestPodcastExists
        ? [...state.podcasts, payload.podcast]
        : state.podcasts.map(item => (item.id === payload.podcast.id ? payload.podcast : item));
      return {
        ...state,
        podcasts: newPodcastList,
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
    case SET_NOW_PLAYING_SOUND_OBJECT:
      return {
        ...state,
        now_playing: {
          ...state.now_playing,
          soundObject: payload.soundObject,
        },
      };
    case SET_NOW_PLAYING_PLAY_BACK_STATUS:
      return {
        ...state,
        now_playing: {
          ...state.now_playing,
          playbackStatus: payload.playbackStatus,
        },
      };
    case SET_NOW_PLAYING:
      return {
        ...state,
        now_playing: payload.now_playing,
      };
    default:
      return state;
  }
}
