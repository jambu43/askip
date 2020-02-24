import {
  TOGGLE_MAGAZINES_PUBLICATION_RELEASES_LOADING,
  SET_MAGAZINE_PUBLICATION_RELEASES,
  SET_MAGAZINE_PUBLICATION_RELEASE,
} from "../types/magazines";

const initialState = {
  magazines_publication_releases: {},
  magazines: [],
  magazines_publication_releases_loading: false,
  magazines_publication_release_loading: {},
  magazines_loading: false,
};

export const magazinesReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case TOGGLE_MAGAZINES_PUBLICATION_RELEASES_LOADING:
      return {
        ...state,
        magazines_publication_releases_loading: payload,
      };
    case SET_MAGAZINE_PUBLICATION_RELEASES:
      let setMagazinePublicationReleasesPayload = {};
      payload.publicationReleases.forEach(item => {
        setMagazinePublicationReleasesPayload[item.id] = item;
      });

      return {
        ...state,
        magazines_publication_releases: {
          ...state.magazines_publication_releases,
          ...setMagazinePublicationReleasesPayload,
        },
      };
    case SET_MAGAZINE_PUBLICATION_RELEASE:
      let setMagazinePublicationReleasePayload = {};
      setMagazinePublicationReleasePayload[payload.publicationRelease.id] =
        payload.publicationRelease;
      return {
        ...state,
        magazines_publication_releases: {
          ...state.magazines_publication_releases,
          ...setMagazinePublicationReleasePayload,
        },
      };
    default:
      return state;
  }
};
