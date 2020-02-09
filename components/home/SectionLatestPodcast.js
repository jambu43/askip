import React from "react";
import styled from "styled-components";
import CardLatestPodcast from "./CardLatestPodcast";

const SectionLatestPodcast = ({ title, podcast, navigation }) => {
  return (
    <Container>
      <Header>
        <Title>{title}</Title>
      </Header>
      <Content>
        <CardLatestPodcast navigation={navigation} podcast={podcast} />
      </Content>
    </Container>
  );
};

const Container = styled.View`
  padding: 0 15px;
`;
const Title = styled.Text`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #fff;
  text-transform: uppercase;
`;

const Content = styled.View``;
const Header = styled.View``;

export default SectionLatestPodcast;
