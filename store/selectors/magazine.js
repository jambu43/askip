import { createSelector } from "reselect";

const getMagazineReleaseId = (state, props) => props.navigation.getParam("magazine_release_id");
const getMagazinesReleases = state => state.magazine.magazines_publication_releases;

export const getMagazineReleaseById = createSelector(
  [getMagazineReleaseId, getMagazinesReleases],
  (magazine_release_id, magazines_releases) => {
    return magazines_releases.find(item => (item.id = magazine_release_id));
  }
);
