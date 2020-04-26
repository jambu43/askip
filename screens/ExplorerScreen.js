import React from "react";
import styled from "styled-components";
import AppHeader from "../components/generic/AppHeader";
import { dark, darkLighten } from "../config/variables";
import { fetchPosts } from "../store/actions/post";
import { connect } from "react-redux";
import { getPosts } from "../store/selectors/post";
import PostCard from "../components/askip/PostCard";

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
    this.props.fetchPosts(this.state.page);
  }

  _handleLoadMore = () => {
    this.setState(
      (prevState, nextProps) => ({
        page: prevState.page + 1,
      }),
      () => {
        this._fetchPostData(this.state.page);
      }
    );
  };

  _renderPost({ item, index }) {
    const { navigation } = this.props;
    return <PostCard post={item} navigation={navigation} key={item.id} />;
  }

  render() {
    const { posts, posts_loading } = this.props;
    return (
      <Container>
        <AppHeader />
        <Content
          keyExtractor={(item) => item.id.toString()}
          extraData={posts}
          data={posts}
          refreshing={posts_loading}
          onRefresh={this._handleRefresh.bind(this)}
          renderItem={this._renderPost.bind(this)}
          showsVerticalScrollIndicator={true}
          numColumns={1}
          onEndReached={this._handleLoadMore.bind(this)}
          onEndReachedThreshold={0.5}
          initialNumToRender={10}
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
`;

const Content = styled.FlatList``;

const Text = styled.Text``;
