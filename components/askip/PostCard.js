import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { assetsUrl } from "../../helpers";
import PlainTextPost from "./PlainTextPost";
import { dark, darkLighten } from "../../config/variables";
import { togglePostConfirmation, togglePostInvalidation } from "../../store/actions/users";
import PostSocialStats from "./PostSocialStats";
import PostSocialInteraction from "./PostSocialInteraction";
import moment from "moment";

class PostCard extends React.Component {
  handlePostShare() {}

  render() {
    const { post, showSocialInteraction, isSharedPost, navigation } = this.props;
    let hasSocialInteraction =
      post.post_confirmations ||
      post.post_invalidations ||
      post.comments_count ||
      post.post_shares_count;
    return (
      <Container isSharedPost={isSharedPost}>
        <AuthorGroup onPress={() => navigation.navigate("Profile", { user_id: post.author.id })}>
          <AuthorImage source={{ uri: post.author.avatar }} />
          <AuthorGroupDetails>
            <Author>{post.author.name}</Author>
            <PostDate>{moment(post.created_at).fromNow()}</PostDate>
          </AuthorGroupDetails>
        </AuthorGroup>
        <CardGroup
          disabled={isSharedPost}
          onPress={() =>
            navigation.navigate("Post", { post_id: post.id, post_author_id: post.author.id })
          }
        >
          {post.content ? <PlainTextPost post={post} /> : null}
          {post.image_path ? <PostPicture source={{ uri: assetsUrl(post.image_path) }} /> : null}
          {post.sourcePost ? (
            <PostCard showSocialInteraction={false} isSharedPost={true} post={post.sourcePost} />
          ) : null}
          {hasSocialInteraction && showSocialInteraction ? <PostSocialStats post={post} /> : null}
        </CardGroup>
        {showSocialInteraction ? (
          <PostSocialInteraction post={post} navigation={navigation} />
        ) : null}
      </Container>
    );
  }
}

const Container = styled.View`
  background: ${dark};
  margin: ${(props) => (props.isSharedPost ? `0px 15px` : `2.5px 0`)};
  border-width: ${(props) => (props.isSharedPost ? `1px` : `0px`)};
  border-color: ${(props) => (props.isSharedPost ? `${darkLighten}` : `transparent`)};
`;
const PostPicture = styled.Image`
  height: 250px;
  background-color: #ffffff;
  width: 100%;
`;

const AuthorGroup = styled.TouchableOpacity`
  flex-direction: row;
  padding: 10px 15px;
  margin-bottom: 5px;
  align-items: center;
`;
const AuthorGroupDetails = styled.View`
  margin-left: 5px;
`;
const PostDate = styled.Text`
  color: #fff;
  font-size: 10px;
`;
const AuthorImage = styled.Image`
  background-color: ${darkLighten};
  border-radius: 15px;
  height: 35px;
  width: 35px;
`;
const Author = styled.Text`
  text-transform: uppercase;
  color: #ffffff;
  font-size: 13px;
`;
const CardGroup = styled.TouchableOpacity``;

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
