import React from "react";
import styled from "styled-components";
import { darkLighten } from "../../config/variables";
import { ActivityIndicator } from "react-native";

export default ({ content, onChange, onSubmit, submitting }) => {
  return (
    <CommentFormWrapper>
      <CommentInput
        placeholder="Votre commentaire..."
        value={content}
        multiline={true}
        editable={!submitting}
        onChangeText={onChange}
      />
      <CommentSendButton disabled={!content || submitting} onPress={onSubmit}>
        {submitting ? null : (
          <CommentSendButtonText disabled={!content}>Envoyer</CommentSendButtonText>
        )}
        {submitting ? <ActivityIndicator color="#fff" /> : null}
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
  color: ${(props) => (props.disabled ? "#aaa" : "#fff")};
`;
