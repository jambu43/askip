import React from "react";
import styled from "styled-components";
import CardLatestPodcast from "./CardLatestPodcast";
import { darkLighten } from "../../config/variables";

const SectionLatestPodcast = ({ title, podcast, navigation }) => {
  return (
    <Container>
      <Content>
        <CardLatestPodcast navigation={navigation} podcast={podcast} />
      </Content>
    </Container>
  );
};

const Container = styled.View`
  padding: 15px;
  background-color: ${darkLighten};
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
