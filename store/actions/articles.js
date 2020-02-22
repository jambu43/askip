import axios from "../../config/axios";
import { TOGGLE_ARTICLE_LIST_LOADING, SET_ARTICLE_LIST } from "../types/newspaper";
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
