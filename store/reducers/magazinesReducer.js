import {
  TOGGLE_MAGAZINES_PUBLICATION_RELEASES_LOADING,
  SET_MAGAZINE_PUBLICATION_RELEASES,
  SET_MAGAZINE_PUBLICATION_RELEASE,
} from "../types/magazines";

const initialState = {
  magazines_publication_releases: [],
  magazines: [],
  magazines_publication_releases_loading: false,
  magazines_loading: false,
};

export const magazinesReducer = (state = initialState, { type, payload }) => {
  console.log(payload, type);
  switch (type) {
    case TOGGLE_MAGAZINES_PUBLICATION_RELEASES_LOADING:
      return {
        ...state,
        magazines_publication_releases_loading: payload,
      };
    case SET_MAGAZINE_PUBLICATION_RELEASES:
      return {
        ...state,
        magazines_publication_releases: [
          ...state.magazines_publication_releases,
          ...payload.publicationReleases,
        ],
      };
    case SET_MAGAZINE_PUBLICATION_RELEASE:
      let publicationReleasesIndex = {};
      state.magazines_publication_releases.forEach(
        (item, index) => (publicationReleasesIndex[item.id] = index)
      );
      return {
        ...state,
        magazines_publication_releases: [
          ...state.magazines_publication_releases.map(item =>
            item.id === payload.publicationRelease.id ? payload.publicationRelease : item
          ),
        ],
      };
    default:
      return state;
  }
};
