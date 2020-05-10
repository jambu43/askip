import React from "react";
import styled from "styled-components";

export default ({ notification, onPress }) => {
  return (
    <Container onPress={() => onPress(notification)}>
      <Text>{notification.content}</Text>
    </Container>
  );
};

const Container = styled.TouchableOpacity``;
const Title = styled.Text``;
const Text = styled.Text`
  color: #fff;
`;
