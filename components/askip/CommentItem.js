import React from "react";
import styled from "styled-components";
import { darkLighten } from "../../config/variables";
import moment from "moment";

export default ({ comment, navigation }) => {
  return (
    <CommentWrapper>
      <CommentAuthorAvatar source={{ uri: comment.author.avatar }} />
      <CommentBodyWrapper>
        <CommentBody>
          <CommentAuthorName>{comment.author.name}</CommentAuthorName>
          <CommentContent>{comment.content}</CommentContent>
          <CommentDate>{moment(comment.created_at).fromNow()}</CommentDate>
        </CommentBody>
        <CommentFeedBackButton
          onPress={() => navigation.navigate("Comment", { comment_id: comment.id })}
        >
          <CommentFeedBackButtonText>
            {comment.commentsCount
              ? `${comment.commentsCount} réponses`
              : `Répondre à ${comment.author.name}`}
          </CommentFeedBackButtonText>
        </CommentFeedBackButton>
      </CommentBodyWrapper>
    </CommentWrapper>
  );
};

const CommentWrapper = styled.View`
  flex-direction: row;
  padding: 0 10px;
  margin-bottom: 10px;
`;
const CommentBodyWrapper = styled.View``;
const CommentBody = styled.View`
  background-color: ${darkLighten};
  padding: 7.5px;
  border-radius: 15px;
  max-width: 270px;
  margin-bottom: 5px;
`;
const CommentContent = styled.Text`
  color: #fff;
  margin-bottom: 5px;
`;
const CommentDate = styled.Text`
  color: #fff;
  font-size: 10px;
`;
const CommentAuthorName = styled.Text`
  color: #fff;
  font-weight: bold;
`;
const CommentAuthorAvatar = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  margin-right: 10px;
`;

const CommentFeedBackButton = styled.TouchableOpacity`
  margin-left: 20px;
`;
const CommentFeedBackButtonText = styled.Text`
  color: #fff;
  font-weight: bold;
  font-size: 12px;
`;
