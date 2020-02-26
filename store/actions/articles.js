import axios from "../../config/axios";
import {
  TOGGLE_ARTICLE_LIST_LOADING,
  SET_ARTICLE_LIST,
  SET_MAGAZINE_ARTICLES,
  TOGGLE_ARTICLE_LOADING,
} from "../types/newspaper";
import { apiUrl } from "../../helpers";

export const toggleArticleListLoading = () => {
  return {
    type: TOGGLE_ARTICLE_LIST_LOADING,
  };
};

export const setArticleList = articles => {
  return {
    type: SET_ARTICLE_LIST,
    payload: {
      articles,
    },
  };
};

export const toggleArticleLoading = (article_id, state) => {
  return {
    type: TOGGLE_ARTICLE_LOADING,
    payload: {
      article_id,
      state,
    },
  };
};

export const setMagazineArticles = articles => {
  return {
    type: SET_MAGAZINE_ARTICLES,
    payload: {
      articles,
    },
  };
};

export const fetchLatestArticles = () => {
  return dispatch => {
    dispatch(toggleArticleListLoading());
    axios
      .get(apiUrl("latest_newspaper_articles"))
      .then(({ data }) => {
        dispatch(setArticleList(data.data));
        dispatch(toggleArticleListLoading());
      })
      .catch(({ response }) => {
        dispatch(toggleArticleListLoading());
      });
  };
};

export const fetchArticleById = article_id => {
  return dispatch => {
    dispatch(toggleArticleLoading(article_id, true));
    axios
      .get(apiUrl(`articles/${article_id}`))
      .then(({ data }) => {
        dispatch(setMagazineArticles([data.data]));
      })
      .catch(({ response }) => {
        console.log(response);
      })
      .finally(() => {
        dispatch(toggleArticleLoading(article_id, false));
      });
  };
};

export const readArticle = article_id => {
  return dispatch => {
    axios
      .post(apiUrl(`articles/${article_id}/read`))
      .then(() => {})
      .catch(({ response }) => {
        console.log(response);
      });
  };
};
