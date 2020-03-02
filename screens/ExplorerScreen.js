import React from 'react';
import styled from 'styled-components';
import AppHeader from '../components/generic/AppHeader';
import PostList from '../components/askip/PostList';
import { dark, darkLighten } from '../config/variables';
import { fetchPosts } from '../store/actions/post';
import { connect } from 'react-redux';
import { getPosts } from '../store/selectors/post';

class ExplorerScreen extends React.Component {
	constructor(props) {
		super(props);
	}
	componentDidMount() {
		this.willFocusSubscription = this.props.navigation.addListener('willFocus', () => {
			this._fetchPostData();
		});
	}
	componentWillUnmount() {
		if (this.willFocusSubscription) {
			this.willFocusSubscription.remove();
		}
	}
	_fetchPostData() {
		this.props.fetchPosts();
	}

	render() {
		const { navigation, posts } = this.props;
		return (
			<Container>
				<AppHeader />
				<PostList navigation={navigation} posts={posts} />
			</Container>
		);
	}
}

const mapStateTopProps = (state) => {
	return {
		posts: getPosts(state),
		posts_loading: state.post.posts_loading
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		fetchPosts: () => dispatch(fetchPosts())
	};
};
export default connect(mapStateTopProps, mapDispatchToProps)(ExplorerScreen);

const Container = styled.View`
	flex: 1;
	background-color: ${darkLighten};
`;
const Text = styled.Text``;
