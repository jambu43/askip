import axios from "../../config/axios";
import {
  TOGGLE_MAGAZINES_PUBLICATION_RELEASES_LOADING,
  SET_MAGAZINE_PUBLICATION_RELEASES,
  TOGGLE_MAGAZINE_PUBLICATION_RELEASE_LOADING,
  SET_MAGAZINE_PUBLICATION_RELEASE,
} from "../types/magazines";
import { apiUrl } from "../../helpers";
import { setMagazineArticles } from "./articles";

export const togglePublicationReleasesLoading = (state) => {
  return {
    type: TOGGLE_MAGAZINES_PUBLICATION_RELEASES_LOADING,
    payload: state,
  };
};

export const toggleMagazinePublicationReleaseLoading = (publication_release_id, state) => {
  return {
    type: TOGGLE_MAGAZINE_PUBLICATION_RELEASE_LOADING,
    payload: {
      publication_release_id,
      state,
    },
  };
};

export const setPublicationReleases = (publicationReleases) => {
  return {
    type: SET_MAGAZINE_PUBLICATION_RELEASES,
    payload: {
      publicationReleases,
    },
  };
};

export const setMagazinePublicationRelease = (publicationRelease) => {
  return {
    type: SET_MAGAZINE_PUBLICATION_RELEASE,
    payload: {
      publicationRelease,
    },
  };
};

export const fetchLatestMagazineReleases = () => {
  return (dispatch) => {
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

export const searchMagazineReleases = (keywords) => {
  return (dispatch) => {
    dispatch(togglePublicationReleasesLoading(true));
    return new Promise((resolve, reject) => {
      axios
        .get(apiUrl(`publication_releases/search/${keywords}`))
        .then(({ data }) => {
          resolve(data.data);
        })
        .catch(({ response }) => {
          console.log(response);
          reject();
        });
    });
  };
};

export const fetchMagazineReleases = (page = 1) => {
  return (dispatch) => {
    dispatch(togglePublicationReleasesLoading(true));
    axios
      .get(apiUrl(`latest_magazines_releases?page=${page}`))
      .then(({ data }) => {
        dispatch(setPublicationReleases(data.data));
        dispatch(togglePublicationReleasesLoading(false));
      })
      .catch(() => {
        dispatch(togglePublicationReleasesLoading(false));
      });
  };
};

export const fetchMagazineRelease = (publication_release_id) => {
  return (dispatch) => {
    //dispatch(toggleMagazinePublicationReleaseLoading(publication_release_id, true));
    axios
      .get(apiUrl(`publication_releases/${publication_release_id}`))
      .then(({ data }) => {
        let magazineRelease = data.data;
        dispatch(setMagazinePublicationRelease(magazineRelease));
        dispatch(setMagazineArticles(magazineRelease.articles));
      })
      .catch(({ response }) => {
        console.log(response);
      })
      .finally(() => {
        //dispatch(toggleMagazinePublicationReleaseLoading(publication_release_id, false));
      });
  };
};
