import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { ScrollView } from "react-native";
import AppHeader from "../components/generic/AppHeader";
import MagazineReleaseList from "../components/home/MagazineReleaseList";
import { dark } from "../config/variables";
import { fetchLatestMagazineReleases } from "../store/actions/magazines";
import { fetchLatestPodcast } from "../store/actions/podcasts";
import SectionLatestPodcast from "../components/home/SectionLatestPodcast";

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.fetchLatestMagazineReleases();
    this.props.fetchLatestPodcast();
  }
  render() {
    const { navigation, magazines_publication_releases, latest_podcast } = this.props;
    return (
      <Container>
        <AppHeader />
        <ScrollView>
          <MagazineReleaseList
            navigation={navigation}
            title="Nouvelles parutions"
            magazines={magazines_publication_releases}
          />
          {latest_podcast ? (
            <SectionLatestPodcast title="Dernière épisode du podcast" podcast={latest_podcast} />
          ) : null}
        </ScrollView>
      </Container>
    );
  }
}

const mapStateTopProps = ({ magazine, podcast }) => {
  return {
    magazines_publication_releases: magazine.magazines_publication_releases,
    magazines_publication_releases_loading: magazine.magazines_publication_releases_loading,
    latest_podcast: podcast.latest_podcast,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchLatestMagazineReleases: () => dispatch(fetchLatestMagazineReleases()),
    fetchLatestPodcast: () => dispatch(fetchLatestPodcast()),
  };
};

export default connect(mapStateTopProps, mapDispatchToProps)(HomeScreen);

const Container = styled.View`
  flex: 1;
  background-color: ${dark};
`;
