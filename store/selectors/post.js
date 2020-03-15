import orderBy from 'lodash/orderBy';
import { createSelector } from 'reselect';

export const _getPosts = (state) => state.post.post_list;

export const getPosts = createSelector([ _getPosts ], (posts) => {
	let postCollection = Object.values(posts);
	return orderBy(postCollection, 'created_at', 'desc');
});
