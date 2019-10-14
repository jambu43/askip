import React from "react";
import styled from "styled-components";
import AppHeader from "../components/generic/AppHeader";

export default class NotificationsScreen extends React.Component {
  render() {
    return (
      <Container>
        <AppHeader />
        <Content>
          <Image source={require("../assets/notifications.png")} />
          <Title>Aucune notification</Title>
          <Text>
            magnam dolores maxime at voluptates nihil iste hic fflibero
            architecto vitae quod veniam? Repellendus! magnam dolores.
          </Text>
        </Content>
      </Container>
    );
  }
}

const Container = styled.View`
  padding: 25px;
  flex: 1;
`;

const Content = styled.View`
  flex: 1;
  justify-content: center;
`;

const Image = styled.Image`
  height: 200px;
  width: 100%;
  margin-bottom: 25px;
`;

const Title = styled.Text`
  font-size: 30px;
  font-weight: bold;
  line-height: 32px;
  color: #222;
  margin-bottom: 15px;
  text-align: center;
`;

const Text = styled.Text`
  color: #222;
  margin-bottom: 15px;
  text-align: center;
`;
