import {
  TOGGLE_ARTICLE_LIST_LOADING,
  SET_ARTICLE_LIST,
  SET_MAGAZINE_ARTICLES,
  TOGGLE_ARTICLE_LOADING,
} from "../types/newspaper";

const initialState = {
  article_list: [],
  article_list_loading: false,
  article_loading: {},
  magazine_articles: {},
};

export const articleReducers = (state = initialState, { type, payload }) => {
  switch (type) {
    case TOGGLE_ARTICLE_LIST_LOADING:
      return {
        ...state,
        article_list_loading: !state.article_list_loading,
      };
    case TOGGLE_ARTICLE_LOADING:
      return {
        ...state,
        article_loading: {
          ...state.article_loading,
          ...{ [payload.article_id]: payload.state },
        },
      };
    case SET_ARTICLE_LIST:
      return {
        ...state,
        article_list: [...payload.articles],
      };
    case SET_MAGAZINE_ARTICLES:
      let setMagazineArticlesPayload = {};
      payload.articles.forEach(item => {
        let prevArticle = state.magazine_articles[item.id] ? state.magazine_articles[item.id] : {};
        setMagazineArticlesPayload[item.id] = {
          ...prevArticle,
          ...item,
        };
      });
      return {
        ...state,
        magazine_articles: {
          ...state.magazine_articles,
          ...setMagazineArticlesPayload,
        },
      };
      break;
    default:
      return state;
  }
};
