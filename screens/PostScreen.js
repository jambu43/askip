import React from "react";
import styled from "styled-components";
import { Entypo, EvilIcons } from "@expo/vector-icons";
import { connect } from "react-redux";
import { dark, danger } from "../config/variables";
import { BackIcon } from "../components/Icons";
import { TouchableOpacity, View, ActivityIndicator } from "react-native";
import { getUserPostById, getPostById, isDeletedPost } from "../store/selectors/post";
import Modal from "react-native-modal";
import PostSocialInteraction from "../components/askip/PostSocialInteraction";
import PlainTextPost from "../components/askip/PlainTextPost";
import PostSocialStats from "../components/askip/PostSocialStats";
import { assetsUrl } from "../helpers";
import { getPostComments, getPostCommentsLoading } from "../store/selectors/comment";
import { fetchPostComment, addComment } from "../store/actions/comments";
import CommentItem from "../components/askip/CommentItem";
import PostCommentInput from "../components/askip/PostCommentInput";
import PostCard from "../components/askip/PostCard";
import { fetchPostById, deletePost } from "../store/actions/post";

const PostOptionItem = ({ item, onPress }) => {
  return (
    <PostOptionItemWrapper onPress={() => onPress(item.value)}>
      <EvilIcons name={item.icon_name} size={24} color={danger} />
      <PostOptionItemLabel>{item.label}</PostOptionItemLabel>
    </PostOptionItemWrapper>
  );
};
class PostScreen extends React.Component {
  state = {
    page: 1,
    content: "",
    commenting: false,
    showModalOptions: false,
    postOptions: [{ icon_name: "trash", label: "Supprimer la publication", value: "DELETE_POST" }],
  };

  componentDidMount() {
    const { isDeletedPost } = this.props;
    let post_id = this.props.navigation.getParam("post_id");
    if (!isDeletedPost) {
      this.props.fetchPostById(post_id);
      this.props.fetchPostComment(post_id, this.state.page);
    }
  }

  renderHeader() {
    const { post, userPost, navigation, isDeletedPost } = this.props;
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
        {!isDeletedPost ? <PostSocialInteraction navigation={navigation} post={postData} /> : null}
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

  togglePostOptions() {
    this.setState({
      showModalOptions: !this.state.showModalOptions,
    });
  }

  handlePostOptionPress(value) {
    this.togglePostOptions();
    const { navigation, post, userPost } = this.props;
    const postData = post ? post : userPost;
    if (value == "DELETE_POST") {
      this.props.deletePost(postData.id).then(() => {
        navigation.goBack();
      });
    }
  }

  render() {
    const {
      navigation,
      comments,
      post,
      userPost,
      post_comment_loading,
      user,
      isDeletedPost,
    } = this.props;
    const { content, commenting, showModalOptions, postOptions } = this.state;
    const postData = post ? post : userPost;
    let isLoading = !postData;
    return (
      <Container>
        <Modal
          style={{ justifyContent: "flex-end", margin: 0 }}
          onSwipeComplete={this.togglePostOptions.bind(this)}
          onBackdropPress={this.togglePostOptions.bind(this)}
          onBackButtonPress={this.togglePostOptions.bind(this)}
          swipeDirection={["down"]}
          isVisible={showModalOptions}
        >
          <PostOptionsWrapper>
            <PostOptionsTitle>Options de la publication</PostOptionsTitle>
            {postOptions.map((item) => {
              return (
                <PostOptionItem
                  onPress={this.handlePostOptionPress.bind(this)}
                  item={item}
                  key={item.value}
                />
              );
            })}
          </PostOptionsWrapper>
        </Modal>
        <Header>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <BackIcon fill="#fff" size={24} />
          </TouchableOpacity>
          {!isLoading && user.id == postData.author.id ? (
            <TouchableOpacity disabled={isDeletedPost} onPress={() => this.togglePostOptions()}>
              <Entypo name="dots-three-horizontal" size={24} color="#ffffff9a" />
            </TouchableOpacity>
          ) : null}
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
            editable={!isDeletedPost}
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
const PostContentWrapper = styled.View`
  margin-bottom: 15px;
`;

const Header = styled.View`
  padding: 7.5px 7.5px;
  margin-top: 24px;
  flex-direction: row;
  justify-content: space-between;
`;

const PostPicture = styled.Image`
  height: 250px;
  background-color: #ffffff;
  width: 100%;
`;

const Content = styled.FlatList``;

const PostOptionsWrapper = styled.View`
  background-color: #ffffff;
  padding: 15px;
  border-top-right-radius: 15px;
  border-top-left-radius: 15px;
`;

const PostOptionsTitle = styled.Text`
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  color: ${dark};
`;

const PostOptionItemWrapper = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: center;
  padding: 15px 10px;
  align-items: center;
`;
const PostOptionItemLabel = styled.Text`
  font-size: 15px;
`;

const mapStateToProps = (state, props) => {
  return {
    user: state.auth.user,
    isDeletedPost: isDeletedPost(state, props),
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
    deletePost: (post_id) => dispatch(deletePost(post_id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostScreen);
