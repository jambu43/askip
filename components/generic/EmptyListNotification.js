import React from "react";
import styled from "styled-components";

export default ({ title, message }) => {
  return (
    <EmptyNotificationWrapper>
      <Title> {title} </Title>
      <Text>{message}</Text>
    </EmptyNotificationWrapper>
  );
};

const EmptyNotificationWrapper = styled.View`
  justify-content: center;
  min-height: 400px;
`;

const Title = styled.Text`
  font-size: 30px;
  font-weight: bold;
  line-height: 32px;
  color: #fff;
  margin-bottom: 15px;
  text-align: center;
`;

const Text = styled.Text`
  color: #fff;
  margin-bottom: 15px;
  text-align: center;
`;
