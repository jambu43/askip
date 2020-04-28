import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { darkLighten, dark } from "../config/variables";
import { BackIcon } from "../components/Icons";
import { TouchableOpacity } from "react-native";
import { getUserPostById, getPostById } from "../store/selectors/post";
import PostSocialInteraction from "../components/askip/PostSocialInteraction";
import PlainTextPost from "../components/askip/PlainTextPost";
import PostSocialStats from "../components/askip/PostSocialStats";
import { assetsUrl } from "../helpers";
import { getPostComments, getPostCommentsLoading } from "../store/selectors/comment";

class PostScreen extends React.Component {
  renderHeader() {
    const { post, userPost } = this.props;
    const postData = post ? post : userPost;
    let hasSocialInteraction =
      postData.post_confirmations ||
      postData.post_invalidations ||
      postData.comments_count ||
      postData.post_shares_count;
    return (
      <PostContentWrapper>
        {postData.content ? <PlainTextPost post={postData} /> : null}
        {postData.image_path ? (
          <PostPicture source={{ uri: assetsUrl(postData.image_path) }} />
        ) : null}
        {hasSocialInteraction ? <PostSocialStats post={postData} /> : null}
        <PostSocialInteraction post={postData} />
      </PostContentWrapper>
    );
  }

  renderComment() {
    return (
      <CommentWrapper>
        <CommentBody>Hello from here!</CommentBody>
      </CommentWrapper>
    );
  }

  _handleRefresh() {}

  _handleLoadMore() {}

  render() {
    const { navigation, comments, post_comment_loading } = this.props;

    return (
      <Container>
        <Header>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <BackIcon fill="#fff" size={24} />
          </TouchableOpacity>
        </Header>
        <Content
          keyExtractor={(item) => item.id.toString()}
          extraData={comments}
          data={comments}
          refreshing={post_comment_loading}
          onRefresh={this._handleRefresh.bind(this)}
          ListHeaderComponent={this.renderHeader.bind(this)}
          renderItem={this.renderComment.bind(this)}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          onEndReached={this._handleLoadMore.bind(this)}
          onEndReachedThreshold={0.5}
          initialNumToRender={10}
        />
      </Container>
    );
  }
}

const Container = styled.View`
  flex: 1;
  background-color: ${dark};
  padding: 10px 0px;
`;
const PostContentWrapper = styled.View``;

const Header = styled.View`
  margin-top: 15px;
  padding: 7.5px 0px;
`;

const PostPicture = styled.Image`
  height: 250px;
  background-color: #ffffff;
  width: 100%;
`;

const Content = styled.FlatList``;
const CommentWrapper = styled.View``;
const CommentBody = styled.Text``;

const mapStateToProps = (state, props) => {
  return {
    userPost: getUserPostById(state, props),
    post: getPostById(state, props),
    comments: getPostComments(state, props),
    post_comment_loading: getPostCommentsLoading(state, props),
  };
};

export default connect(mapStateToProps)(PostScreen);
