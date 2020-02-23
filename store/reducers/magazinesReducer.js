import {
  TOGGLE_MAGAZINES_PUBLICATION_RELEASES_LOADING,
  SET_MAGAZINE_PUBLICATION_RELEASES,
  SET_MAGAZINE_PUBLICATION_RELEASE,
} from "../types/magazines";

const initialState = {
  magazines_publication_releases: [],
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
      return {
        ...state,
        magazines_publication_releases: [...payload.publicationReleases],
      };
    case SET_MAGAZINE_PUBLICATION_RELEASE:
      let publicationRelease = state.magazines_publication_releases.find(
        item => item.id === payload.publicationRelease.id
      );
      let magazinesPublicationReleases = publicationRelease
        ? state.magazines_publication_releases.map(item => {
            return item.id === payload.publicationRelease.id ? payload.publicationRelease : item;
          })
        : [...state.magazines_publication_releases, payload.publicationRelease];
      return {
        ...state,
        magazines_publication_releases: magazinesPublicationReleases,
      };
    default:
      return state;
  }
};
