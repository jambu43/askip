import React from "react";
import styled from "styled-components";
import { darkLighten } from "../../config/variables";

export default ({ content, onChange, onSubmit }) => {
  return (
    <CommentFormWrapper>
      <CommentInput
        placeholder="Votre commentaire..."
        value={content}
        multiline={true}
        onChangeText={onChange}
      />
      <CommentSendButton disabled={!content} onPress={onSubmit}>
        <CommentSendButtonText>Envoyer</CommentSendButtonText>
      </CommentSendButton>
    </CommentFormWrapper>
  );
};

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
