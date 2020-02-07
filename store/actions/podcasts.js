import axios from "../../config/axios";
import { apiUrl } from "../../helpers";
import {
  TOGGLE_PODCASTS_LOADING,
  TOGGLE_PODCAST_LOADING,
  SET_LATEST_PODCAST,
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
