import { TOGGLE_ARTICLE_LIST_LOADING, SET_ARTICLE_LIST } from '../types/newspaper';

const initialState = {
	article_list: [],
	article_list_loading: false,
	article_loading: {}
};

export const newspaperReducers = (state = initialState, { type, payload }) => {
	switch (type) {
		case TOGGLE_ARTICLE_LIST_LOADING:
			return {
				...state,
				article_list_loading: !state.article_list_loading
			};
		case SET_ARTICLE_LIST:
			return {
				...state,
				article_list: [ ...payload.articles ]
			};
		default:
			return state;
	}
};
