import React from "react";
import styled from "styled-components";
import { darkLighten } from "../../config/variables";
import moment from "moment";
import { simplePlural } from "../../helpers";

export default ({ comment, navigation, showFeedBackButton = true, setBack = false }) => {
  return (
    <CommentWrapper setBack={setBack}>
      <CommentAuthorAvatar source={{ uri: comment.author.avatar }} />
      <CommentBodyWrapper>
        <CommentBody>
          <CommentAuthorNameWrapper
            onPress={() => navigation.navigate("Profile", { user_id: comment.author.id })}
          >
            <CommentAuthorName>{comment.author.name}</CommentAuthorName>
          </CommentAuthorNameWrapper>
          <CommentContent>{comment.content}</CommentContent>
          <CommentDate>{moment(comment.created_at).fromNow()}</CommentDate>
        </CommentBody>
        {showFeedBackButton ? (
          <CommentFeedBackButton
            onPress={() =>
              navigation.navigate("Comment", { comment_id: comment.id, post_id: comment.post_id })
            }
          >
            <CommentFeedBackButtonText>
              {comment.commentsCount
                ? `Voir ${simplePlural(comment.commentsCount, "les", "la")} ${
                    comment.commentsCount > 1 ? comment.commentsCount : "seule"
                  } ${simplePlural(comment.commentsCount, "réponses", "réponse")}`
                : `Répondre à ${comment.author.name}`}
            </CommentFeedBackButtonText>
          </CommentFeedBackButton>
        ) : null}
      </CommentBodyWrapper>
    </CommentWrapper>
  );
};

const CommentWrapper = styled.View`
  flex-direction: row;
  padding: 0 10px;
  margin-bottom: 10px;
  padding-left: ${(props) => (props.setBack ? "60px" : "10px")};
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

const CommentAuthorNameWrapper = styled.TouchableOpacity``;
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
