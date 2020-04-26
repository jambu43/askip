import React from "react";
import styled from "styled-components";
import AppHeader from "../components/generic/AppHeader";
import PostList from "../components/askip/PostList";
import { dark, darkLighten } from "../config/variables";
import { fetchPosts } from "../store/actions/post";
import { connect } from "react-redux";
import { getPosts } from "../store/selectors/post";

class ExplorerScreen extends React.Component {
  state = {
    page: 1,
  };

  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.willFocusSubscription = this.props.navigation.addListener("willFocus", () => {
      this._fetchPostData(this.state.page);
    });
  }
  componentWillUnmount() {
    if (this.willFocusSubscription) {
      this.willFocusSubscription.remove();
    }
  }

  _handleRefresh() {
    this.setState({
      page: 1,
    });

    this._fetchPostData();
  }
  _fetchPostData() {
    this.props.fetchPosts();
  }

  render() {
    const { navigation, posts, posts_loading } = this.props;
    return (
      <Container>
        <AppHeader />
        <PostList
          onRefresh={this._handleRefresh.bind(this)}
          navigation={navigation}
          posts={posts}
          post_loading={posts_loading}
        />
      </Container>
    );
  }
}

const mapStateTopProps = (state) => {
  return {
    posts: getPosts(state),
    posts_loading: state.post.post_list_loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPosts: (page) => dispatch(fetchPosts(page)),
  };
};
export default connect(mapStateTopProps, mapDispatchToProps)(ExplorerScreen);

const Container = styled.View`
  flex: 1;
  background-color: ${darkLighten};
  padding-bottom: 80px;
`;
const Text = styled.Text``;
