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
import { fetchPostComment, addComment } from "../store/actions/comments";

class PostScreen extends React.Component {
  state = {
    page: 1,
    content: "",
  };

  componentDidMount() {
    let post_id = this.props.navigation.getParam("post_id");
    this.props.fetchPostComment(post_id, this.state.page);
  }

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
    this.props.addComment(post_id, {
      content: this.state.content,
    });

    this.setState({
      content: "",
    });
  }

  render() {
    const { navigation, comments, post_comment_loading } = this.props;
    const { content } = this.state;
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
          onEndReached={this._handleLoadMore.bind(this)}
          onEndReachedThreshold={0.5}
          initialNumToRender={10}
        />
        <CommentFormWrapper>
          <CommentInput
            placeholder="Votre commentaire..."
            value={content}
            onChangeText={this.handleCommentChange.bind(this)}
          />
          <CommentSendButton disabled={!content} onPress={this.handleCommentSubmit.bind(this)}>
            <CommentSendButtonText>Envoyer</CommentSendButtonText>
          </CommentSendButton>
        </CommentFormWrapper>
      </Container>
    );
  }
}

const Container = styled.View`
  flex: 1;
  background-color: ${dark};
  padding: 10px 0px 0px;
  position: relative;
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

const CommentFormWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 15px;
  border-top-color: ${darkLighten};
  border-top-width: 1px;
`;
const CommentInput = styled.TextInput`
  flex: 1;
  color: #fff;
`;
const CommentSendButton = styled.TouchableOpacity``;
const CommentSendButtonText = styled.Text`
  color: #fff;
`;

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
    fetchPostComment: (post_id, page) => dispatch(fetchPostComment(post_id, page)),
    addComment: (post_id, post) => dispatch(addComment(post_id, post)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostScreen);
