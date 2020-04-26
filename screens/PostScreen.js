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

class PostScreen extends React.Component {
  render() {
    const { navigation, userPost, post } = this.props;
    const postData = userPost ? userPost : post;
    let hasSocialInteraction =
      postData.post_confirmations ||
      postData.post_invalidations ||
      postData.comments_count ||
      postData.post_shares_count;

    return (
      <Container>
        <Header>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <BackIcon fill="#fff" size={24} />
          </TouchableOpacity>
        </Header>
        <Content>
          {postData.content ? <PlainTextPost post={postData} /> : null}
          {postData.image_path ? (
            <PostPicture source={{ uri: assetsUrl(postData.image_path) }} />
          ) : null}
          {hasSocialInteraction ? <PostSocialStats post={postData} /> : null}
          <PostSocialInteraction post={postData} />
        </Content>
      </Container>
    );
  }
}

const Container = styled.View`
  flex: 1;
  background-color: ${dark};
  padding: 10px 0px;
`;
const Header = styled.View`
  margin-top: 15px;
  padding: 7.5px 0px;
`;

const PostPicture = styled.Image`
  height: 250px;
  background-color: #ffffff;
  width: 100%;
`;

const Content = styled.View``;

const mapStateToProps = (state, props) => {
  return {
    userPost: getUserPostById(state, props),
    post: getPostById(state, props),
  };
};

export default connect(mapStateToProps)(PostScreen);
