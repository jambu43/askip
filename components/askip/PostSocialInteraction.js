import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { togglePostInvalidation, togglePostConfirmation } from "../../store/actions/users";
import { ActivityIndicator } from "react-native";

const likeIconActive = require("../../assets/like-icon-active.png");
const likeIcon = require("../../assets/like-icon.png");
const unLikeIcon = require("../../assets/un-like-icon.png");
const unLikeIconActive = require("../../assets/un-like-icon-active.png");

const PostSocialInteraction = ({
  post,
  post_liking,
  togglePostInvalidation,
  togglePostConfirmation,
  navigation,
}) => {
  let isPostLiking = post_liking[post.id] ? post_liking[post.id] : false;
  return (
    <PostSocialInteractionWrapper>
      <IconGroup
        disabled={isPostLiking || post.does_auth_invalidated}
        onPress={() => togglePostConfirmation(post.id)}
      >
        {isPostLiking ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <InteractionIcon
            disabled={isPostLiking || post.does_auth_invalidated}
            source={post.does_auth_confirmed ? likeIconActive : likeIcon}
          />
        )}
        <SocialInteractionTitle
          disabled={isPostLiking || post.does_auth_invalidated}
          active={post.does_auth_confirmed}
        >
          C'est vrai
        </SocialInteractionTitle>
      </IconGroup>
      <IconGroup
        disabled={isPostLiking || post.does_auth_confirmed}
        onPress={() => togglePostInvalidation(post.id)}
      >
        {isPostLiking ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <InteractionIcon
            disabled={isPostLiking || post.does_auth_confirmed}
            source={post.does_auth_invalidated ? unLikeIconActive : unLikeIcon}
          />
        )}
        <SocialInteractionTitle
          disabled={isPostLiking || post.does_auth_confirmed}
          active={post.does_auth_invalidated}
        >
          C'est faux
        </SocialInteractionTitle>
      </IconGroup>
      <IconGroup
        disabled={isPostLiking}
        onPress={() => {
          let post_id = post.sourcePost ? post.sourcePost.id : post.id;
          navigation.navigate("SharePost", { post_id: post_id });
        }}
      >
        <InteractionIcon source={require("../../assets/share-icone.png")} />
        <SocialInteractionTitle>Partager</SocialInteractionTitle>
      </IconGroup>
    </PostSocialInteractionWrapper>
  );
};

const PostSocialInteractionWrapper = styled.View`
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
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
`;
const SocialInteractionTitle = styled.Text`
  color: ${(props) => (props.active ? "#2d88ff" : "#ffffff")};
  font-weight: ${(props) => (props.active ? "bold" : "normal")};
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
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

export default connect(mapStateToProps, mapDispatchToProps)(PostSocialInteraction);
