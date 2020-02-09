import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { dark } from "../config/variables";

class PodcastsScreen extends React.Component {
  render() {
    return (
      <Container>
        <Content></Content>
      </Container>
    );
  }
}

const Container = styled.View`
  background: ${dark};
`;
const Content = styled.View``;

const mapStateToProps = ({ podcast }) => {
  return {
    podcasts: podcast.podcasts,
  };
};

export default connect(mapStateToProps)(PodcastsScreen);
