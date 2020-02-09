import axios from "../../config/axios";
import { apiUrl } from "../../helpers";
import {
  TOGGLE_PODCASTS_LOADING,
  TOGGLE_PODCAST_LOADING,
  SET_LATEST_PODCAST,
  SET_NOW_PLAYING_SOUND_OBJECT,
  SET_NOW_PLAYING_PLAY_BACK_STATUS,
  SET_NOW_PLAYING,
} from "../types/podcast";

export const togglePodcastsLoading = () => {
  return {
    type: TOGGLE_PODCASTS_LOADING,
  };
};

export const togglePodcastLoading = () => {
  return {
    type: TOGGLE_PODCAST_LOADING,
  };
};

export const setLatestPodcast = podcast => {
  return {
    type: SET_LATEST_PODCAST,
    payload: {
      podcast,
    },
  };
};

export const setNowPlayingSoundObject = soundObject => {
  return {
    type: SET_NOW_PLAYING_SOUND_OBJECT,
    payload: {
      soundObject,
    },
  };
};
export const setNowPlayingPlayBackStatus = playbackStatus => {
  return {
    type: SET_NOW_PLAYING_PLAY_BACK_STATUS,
    payload: {
      playbackStatus,
    },
  };
};

export const setNowPlaying = ({ soundObject, playbackStatus, podcast_id }) => {
  return {
    type: SET_NOW_PLAYING,
    payload: {
      now_playing: {
        soundObject,
        playbackStatus,
        podcast_id,
      },
    },
  };
};

export const fetchLatestPodcast = () => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      axios
        .get(apiUrl("latest_podcast"))
        .then(({ data }) => {
          dispatch(setLatestPodcast(data.data));
        })
        .catch(({ response }) => {
          console.log("response:", response);
        });
    });
  };
};
