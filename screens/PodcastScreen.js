import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { dark } from "../config/variables";

class PodcastScreen extends React.Component {
  render() {
    <Container>
      <Header />
    </Container>;
  }
}

const Container = styled.View`
  background: ${dark};
`;
const Header = styled.View``;

const mapStateToProps = ({ podcast }) => {
  return {
    now_playing: podcast.now_playing,
  };
};

export default connect(mapStateToProps)(PodcastScreen);
