import { createSelector } from "reselect";

const getMagazineReleaseId = (state, props) => props.navigation.getParam("magazine_release_id");
const _getMagazinesReleases = state => state.magazine.magazines_publication_releases;
const _getArticleId = (state, props) => props.navigation.getParam("article_id");
const _getArticles = state => state.article.magazine_articles;

export const getMagazineReleaseById = createSelector(
  [getMagazineReleaseId, _getMagazinesReleases],
  (magazine_release_id, magazines_releases) => {
    return magazines_releases[magazine_release_id] ? magazines_releases[magazine_release_id] : null;
  }
);

export const getMagazinesReleases = createSelector([_getMagazinesReleases], magazines_releases => {
  return Object.keys(magazines_releases).map(release_id => magazines_releases[release_id]);
});

export const getArticleById = createSelector(
  [_getArticleId, _getArticles],
  (article_id, articles) => {
    return articles[article_id] ? articles[article_id] : null;
  }
);
