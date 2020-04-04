import orderBy from "lodash/orderBy";
import { createSelector } from "reselect";

const getMagazineReleaseId = (state, props) => props.navigation.getParam("magazine_release_id");
const _getMagazinesReleases = (state) => state.magazine.magazines_publication_releases;
const _getArticleId = (state, props) => props.navigation.getParam("article_id");
const _getArticles = (state) => state.article.magazine_articles;

export const getMagazineReleaseById = createSelector(
  [getMagazineReleaseId, _getMagazinesReleases],
  (magazine_release_id, magazines_releases) => {
    return magazines_releases[magazine_release_id] ? magazines_releases[magazine_release_id] : null;
  }
);

export const getMagazineReleaseNextArticle = createSelector(
  [_getMagazinesReleases, _getArticleId, getMagazineReleaseId],
  (magazines_releases, article_id, magazine_release_id) => {
    let magazinesRelease = magazines_releases[magazine_release_id];
    if (!magazinesRelease || !magazinesRelease.articles) {
      return null;
    }
    let nextArticle = magazinesRelease.articles.find((item) => item.id > article_id);
    return nextArticle ? nextArticle : null;
  }
);

export const getMagazineReleasePrevArticle = createSelector(
  [_getMagazinesReleases, _getArticleId, getMagazineReleaseId],
  (magazines_releases, article_id, magazine_release_id) => {
    let magazinesRelease = magazines_releases[magazine_release_id];
    if (!magazinesRelease || !magazinesRelease.articles) {
      return null;
    }
    let articles = magazinesRelease.articles;
    articles.reverse();
    let prevArticle = articles.find((item) => item.id < article_id);
    return prevArticle ? prevArticle : null;
  }
);

export const getMagazinesReleases = createSelector(
  [_getMagazinesReleases],
  (magazines_releases) => {
    let magazineList = Object.keys(magazines_releases).map(
      (release_id) => magazines_releases[release_id]
    );
    return orderBy(magazineList, "publication_date", "desc");
  }
);

export const getArticleById = createSelector(
  [_getArticleId, _getArticles],
  (article_id, articles) => {
    return articles[article_id] ? articles[article_id] : null;
  }
);
