import React from "react";
import styled from "styled-components";
import AppHeader from "../components/generic/AppHeader";
import { connect } from "react-redux";
import { dark } from "../config/variables";
import { fetchUserPodcasts } from "../store/actions/podcasts";

class PodcastsScreen extends React.Component {
  componentDidMount() {
    this.props.fetchUserPodcasts();
  }

  render() {
    return (
      <Container>
        <AppHeader />
        <Content></Content>
      </Container>
    );
  }
}

const Container = styled.View`
  background: ${dark};
  flex: 1;
`;
const Content = styled.View``;

const mapDispatchToProps = dispatch => {
  return {
    fetchUserPodcasts: () => dispatch(fetchUserPodcasts()),
  };
};
const mapStateToProps = state => {
  return {
    podcasts: state.podcast.podcasts,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PodcastsScreen);
