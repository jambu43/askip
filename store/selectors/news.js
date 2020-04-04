import orderBy from "lodash/orderBy";
import { createSelector } from "reselect";

const _getArticleId = (state, props) => props.navigation.getParam("article_id");
const _getArticles = (state) => state.article.news_articles;

export const getNewsArticleById = createSelector(
  [_getArticleId, _getArticles],
  (article_id, articles) => {
    return articles[article_id] ? articles[article_id] : null;
  }
);

export const getNewsArticles = createSelector([_getArticles], (posts) => {
  let postCollection = Object.values(posts);
  return orderBy(postCollection, "created_at", "desc");
});
