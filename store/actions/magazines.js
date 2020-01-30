import axios from "../../config/axios";
import {
  TOGGLE_MAGAZINES_PUBLICATION_RELEASES_LOADING,
  SET_MAGAZINE_PUBLICATION_RELEASES,
} from "../types/magazines";
import { apiUrl } from "../../helpers";

export const togglePublicationReleasesLoading = state => {
  return {
    type: TOGGLE_MAGAZINES_PUBLICATION_RELEASES_LOADING,
    payload: state,
  };
};

export const setPublicationReleases = publicationReleases => {
  return {
    type: SET_MAGAZINE_PUBLICATION_RELEASES,
    payload: {
      publicationReleases,
    },
  };
};

export const fetchLatestMagazineReleases = () => {
  return dispatch => {
    dispatch(togglePublicationReleasesLoading(true));
    axios
      .get(apiUrl("latest_magazines_releases"))
      .then(({ data }) => {
        dispatch(setPublicationReleases(data.data));
        dispatch(togglePublicationReleasesLoading(false));
      })
      .catch(() => {
        dispatch(togglePublicationReleasesLoading(false));
      });
  };
};
