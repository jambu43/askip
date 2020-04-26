import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { assetsUrl } from "../../helpers";
import PlainTextPost from "./PlainTextPost";
import { dark, darkLighten } from "../../config/variables";
import { togglePostConfirmation, togglePostInvalidation } from "../../store/actions/users";
import PostSocialStats from "./PostSocialStats";
import PostSocialInteraction from "./PostSocialInteraction";

class PostCard extends React.Component {
  handlePostShare() {}

  render() {
    const { post, navigation } = this.props;
    let hasSocialInteraction =
      post.post_confirmations ||
      post.post_invalidations ||
      post.comments_count ||
      post.post_shares_count;
    return (
      <Container>
        <AuthorGroup onPress={() => navigation.navigate("Profile", { post_id: post.author.id })}>
          <AuthorImage source={{ uri: post.author.avatar }} />
          <Author>{post.author.name}</Author>
        </AuthorGroup>
        <CardGroup
          onPress={() =>
            navigation.navigate("Post", { post_id: post.id, post_author_id: post.author.id })
          }
        >
          {post.content ? <PlainTextPost post={post} /> : null}
          {post.image_path ? <PostPicture source={{ uri: assetsUrl(post.image_path) }} /> : null}
          {hasSocialInteraction ? <PostSocialStats post={post} /> : null}
        </CardGroup>
        <PostSocialInteraction post={post} />
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
