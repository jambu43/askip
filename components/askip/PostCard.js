import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { assetsUrl } from "../../helpers";
import PlainTextPost from "./PlainTextPost";
import { dark, darkLighten } from "../../config/variables";
import { togglePostConfirmation, togglePostInvalidation } from "../../store/actions/users";
import { ActivityIndicator } from "react-native";

const likeIcon = require("../../assets/like-icon.png");
const likeIconActive = require("../../assets/like-icon-active.png");
const unLikeIcon = require("../../assets/un-like-icon.png");
const unLikeIconActive = require("../../assets/un-like-icon-active.png");

class PostCard extends React.Component {
  handleTogglePostConfirm() {
    this.props.togglePostConfirmation(this.props.post.id);
  }

  handleTogglePostInvalidate() {
    this.props.togglePostInvalidation(this.props.post.id);
  }

  handlePostShare() {}

  render() {
    const { post, navigation, post_liking } = this.props;
    let isPostLiking = post_liking[post.id] ? post_liking[post.id] : false;
    return (
      <Container>
        <AuthorGroup onPress={() => navigation.navigate("Profile", { user_id: post.author.id })}>
          <AuthorImage source={{ uri: post.author.avatar }} />
          <Author>{post.author.name}</Author>
        </AuthorGroup>
        {post.content ? <PlainTextPost post={post} /> : null}
        {post.image_path ? <PostPicture source={{ uri: assetsUrl(post.image_path) }} /> : null}
        <CardGroup>
          <PostSocialInteraction>
            <IconGroup
              disabled={isPostLiking || post.does_auth_invalidated}
              onPress={this.handleTogglePostConfirm.bind(this)}
            >
              {isPostLiking ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <InteractionIcon source={post.does_auth_confirmed ? likeIconActive : likeIcon} />
              )}
              <SocialInteractionTitle active={post.does_auth_confirmed}>
                C'est vrai
              </SocialInteractionTitle>
            </IconGroup>
            <IconGroup
              disabled={isPostLiking || post.does_auth_confirmed}
              onPress={this.handleTogglePostInvalidate.bind(this)}
            >
              {isPostLiking ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <InteractionIcon
                  source={post.does_auth_invalidated ? unLikeIconActive : unLikeIcon}
                />
              )}
              <SocialInteractionTitle active={post.does_auth_invalidated}>
                C'est faux
              </SocialInteractionTitle>
            </IconGroup>
            <IconGroup disabled={isPostLiking} onPress={this.handlePostShare.bind(this)}>
              <InteractionIcon source={require("../../assets/share-icone.png")} />
              <SocialInteractionTitle>Partager</SocialInteractionTitle>
            </IconGroup>
          </PostSocialInteraction>
        </CardGroup>
      </Container>
    );
  }
}

const Container = styled.View`
  background: ${dark};
  margin: 2.5px 0;
`;
const PostPicture = styled.Image`
  height: 250px;
  background-color: #ffffff;
  width: 100%;
`;
const PostSocialInteraction = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`;
const IconGroup = styled.TouchableOpacity`
  margin: 20px 10px;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
`;
const InteractionIcon = styled.Image`
  height: 20px;
  width: 20px;
  margin-right: 10px;
`;
const SocialInteractionTitle = styled.Text`
  color: ${(props) => (props.active ? "#2d88ff" : "#ffffff")};
  font-weight: ${(props) => (props.active ? "bold" : "normal")};
`;
const ShareTime = styled.Text`
  color: #ffffff;
`;
const NumberLike = styled.Text`
  color: #ffffff;
  margin-top: 5px;
`;

const AuthorGroup = styled.TouchableOpacity`
  flex-direction: row;
  padding: 10px 15px;
  margin-bottom: 5px;
  align-items: center;
`;
const AuthorImage = styled.Image`
  background-color: ${darkLighten};
  border-radius: 15px;
  height: 30px;
  width: 30px;
`;
const Author = styled.Text`
  text-transform: uppercase;
  color: #ffffff;
  font-size: 13px;
  margin-left: 5px;
`;
const CardGroup = styled.View``;

const CommentSection = styled.View`
  margin: 10px;
  flex-direction: row;
  flex-wrap: wrap;
`;
const AuthorComment = styled.Image`
  background-color: #ffffff;
  border-radius: 20px;
  height: 30px;
  width: 30px;
`;
const CommentInput = styled.TextInput`
  border-bottom-width: 1px;
  border-bottom-color: #ffffff;
  line-height: 20px;
  padding: 2.5px 5px;
  margin-bottom: 20px;
  border-radius: 5px;
  width: 100%;
`;

const mapStateToProps = (state) => {
  return {
    post_liking: state.post.post_liking,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    togglePostConfirmation: (post_id) => dispatch(togglePostConfirmation(post_id)),
    togglePostInvalidation: (post_id) => dispatch(togglePostInvalidation(post_id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostCard);
