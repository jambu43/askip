import React from 'react';
import styled from 'styled-components';
import AppHeader from '../components/generic/AppHeader';
import AskipReleaseList from '../components/home/AskipReleaseList';
import { dark } from '../config/variables';
import { fetchLatestPosts } from '../store/actions/post';
import { connect } from 'react-redux';

class ExplorerScreen extends React.Component {
	constructor(props){
		super(props);
	}
	componentDidMount() {
		this.willFocusSubscription = this.props.navigation.addListener("willFocus", () => {
			this._fetchPostData();
		});
	}
	componentWillUnmount() {
		if (this.willFocusSubscription) {
			this.willFocusSubscription.remove();
		}
	}
	_fetchPostData() {
    this.props.fetchLatestPosts();
  }

	render() {
		const {
			navigation,
			posts
		} = this.props;
		return (
			<Container>
				<AppHeader />
				<AskipReleaseList navigation={navigation} posts={posts} />
			</Container>
		);
	}

}

const mapStateTopProps = state => {
  return {
		posts: state.post.post_list,
		posts_loading: state.post.posts_loading,

  };
};

const mapDispatchToProps = dispatch => {
	return {
		fetchLatestPosts: () => dispatch(fetchLatestPosts()),
	};
};
export default connect(mapStateTopProps, mapDispatchToProps)(ExplorerScreen);

const Container = styled.View`
	flex: 1;
	background-color: ${dark};
`;
const Text = styled.Text``;
