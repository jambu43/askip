import React from "react";
import styled from "styled-components";
import { assetsUrl } from "../../helpers";
import PlainTextPost from "./PlainTextPost";
import { dark, darkLighten } from "../../config/variables";

export default class PostCard extends React.Component {
  render() {
    const { post, navigation } = this.props;
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
            <IconGroup>
              <InteractionIcon source={require("../../assets/like-icone.png")} />
              <SocialInteractionTitle>C'est vrai</SocialInteractionTitle>
            </IconGroup>
            <IconGroup>
              <InteractionIcon source={require("../../assets/unlinke-icone.png")} />
              <SocialInteractionTitle>C'est faux</SocialInteractionTitle>
            </IconGroup>
            <IconGroup>
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
  color: #ffffff;
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
