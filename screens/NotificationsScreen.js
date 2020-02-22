import React from "react";
import styled from "styled-components";
import AppHeader from "../components/generic/AppHeader";
import { dark } from "../config/variables";

export default class NotificationsScreen extends React.Component {
  render() {
    return (
      <Container>
        <AppHeader />
        <Content>
          <Image source={require("../assets/notifications.png")} />
          <Title> Aucune notification </Title>
          <Text>
            magnam dolores maxime at voluptates nihil iste hic fflibero architecto vitae quod veniam
            ? Repellendus!magnam dolores.{" "}
          </Text>
        </Content>
      </Container>
    );
  }
}

const Container = styled.View`
  flex: 1;
  background: ${dark};
`;

const Content = styled.View`
  flex: 1;
  justify-content: center;
`;

const Image = styled.Image`
  height: 140px;
  width: 240px;
  margin: 0 auto;
  margin-bottom: 25px;
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
