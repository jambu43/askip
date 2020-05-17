import React from "react";
import styled from "styled-components";
import moment from "moment";
import { connect } from "react-redux";
import { darkLighten, dark } from "../config/variables";
import { BackIcon } from "../components/Icons";
import { TouchableOpacity, View, ActivityIndicator } from "react-native";
import { getUserPostById, getPostById } from "../store/selectors/post";
import PostSocialInteraction from "../components/askip/PostSocialInteraction";
import PlainTextPost from "../components/askip/PlainTextPost";
import PostSocialStats from "../components/askip/PostSocialStats";
import { assetsUrl, apiUrl } from "../helpers";
import { getPostComments, getPostCommentsLoading } from "../store/selectors/comment";
import { fetchPostComment, addComment } from "../store/actions/comments";
import CommentItem from "../components/askip/CommentItem";
import PostCommentInput from "../components/askip/PostCommentInput";
import PostCard from "../components/askip/PostCard";
import { fetchPostById } from "../store/actions/post";

class PostScreen extends React.Component {
  state = {
    page: 1,
    content: "",
    commenting: false,
  };

  componentDidMount() {
    let post_id = this.props.navigation.getParam("post_id");
    this.props.fetchPostById(post_id);
    this.props.fetchPostComment(post_id, this.state.page);
  }

  renderHeader() {
    const { post, userPost, navigation } = this.props;
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
        {postData.sourcePost ? (
          <PostCard showSocialInteraction={false} isSharedPost={true} post={postData.sourcePost} />
        ) : null}
        {hasSocialInteraction ? (
          <PostSocialStats
            likeGroupClickEnabled={true}
            onLikeGroupClick={() =>
              navigation.navigate("PostInteraction", {
                post_id: postData.id,
                showLikers: postData.post_confirmations > postData.post_invalidations,
              })
            }
            post={postData}
          />
        ) : null}
        <PostSocialInteraction navigation={navigation} post={postData} />
      </PostContentWrapper>
    );
  }

  renderComment({ item }) {
    return <CommentItem comment={item} navigation={this.props.navigation} />;
  }

  _handleRefresh() {
    let post_id = this.props.navigation.getParam("post_id");
    this.props.fetchPostComment(post_id, 1);
  }

  _handleLoadMore() {
    let post_id = this.props.navigation.getParam("post_id");
    this.setState(
      (prevState, nextProps) => ({
        page: prevState.page + 1,
      }),
      () => {
        this.props.fetchPostComment(post_id, this.state.page);
      }
    );
  }

  handleCommentChange(text) {
    this.setState({
      content: text,
    });
  }

  handleCommentSubmit() {
    let post_id = this.props.navigation.getParam("post_id");
    this.setState({
      commenting: true,
    });
    this.props
      .addComment(post_id, {
        content: this.state.content,
      })
      .then(() => {
        this.setState({
          content: "",
          commenting: false,
        });
      })
      .catch(() => {
        this.setState({
          commenting: false,
        });
      });
  }

  render() {
    const { navigation, comments, post, userPost, post_comment_loading } = this.props;
    const { content, commenting } = this.state;
    const postData = post ? post : userPost;
    let isLoading = !postData;
    return (
      <Container>
        <Header>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <BackIcon fill="#fff" size={24} />
          </TouchableOpacity>
        </Header>
        {!isLoading ? (
          <Content
            keyExtractor={(item) => item.id.toString()}
            extraData={comments}
            data={comments}
            refreshing={post_comment_loading}
            onRefresh={this._handleRefresh.bind(this)}
            ListHeaderComponent={this.renderHeader.bind(this)}
            renderItem={this.renderComment.bind(this)}
            showsVerticalScrollIndicator={false}
            onEndReached={this._handleLoadMore.bind(this)}
            onEndReachedThreshold={0.5}
            initialNumToRender={10}
          />
        ) : null}
        {!isLoading ? (
          <PostCommentInput
            submitting={commenting}
            content={content}
            onSubmit={this.handleCommentSubmit.bind(this)}
            onChange={this.handleCommentChange.bind(this)}
          />
        ) : null}
        {!isLoading ? <View style={{ height: 0 }} /> : <ActivityIndicator color="#fff" />}
      </Container>
    );
  }
}

const Container = styled.KeyboardAvoidingView`
  flex: 1;
  background-color: ${dark};
  padding: 10px 0px 0px;
  position: relative;
  flex-grow: 1;
`;
const PostContentWrapper = styled.View``;

const Header = styled.View`
  padding: 7.5px 0px;
`;

const PostPicture = styled.Image`
  height: 250px;
  background-color: #ffffff;
  width: 100%;
`;

const Content = styled.FlatList``;

const mapStateToProps = (state, props) => {
  return {
    userPost: getUserPostById(state, props),
    post: getPostById(state, props),
    comments: getPostComments(state, props),
    post_comment_loading: getPostCommentsLoading(state, props),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPostById: (post_id) => dispatch(fetchPostById(post_id)),
    fetchPostComment: (post_id, page) => dispatch(fetchPostComment(post_id, page)),
    addComment: (post_id, post) => dispatch(addComment(post_id, post)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostScreen);
