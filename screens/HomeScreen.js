import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { ScrollView } from "react-native";
import AppHeader from "../components/generic/AppHeader";
import MagazineReleaseList from "../components/home/MagazineReleaseList";
import { dark } from "../config/variables";
import { fetchLatestMagazineReleases } from "../store/actions/magazines";

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.fetchLatestMagazineReleases();
  }
  render() {
    const { navigation, magazines_publication_releases } = this.props;
    console.log(magazines_publication_releases);
    return (
      <Container>
        <AppHeader />
        <ScrollView>
          <MagazineReleaseList
            navigation={navigation}
            title="Nouvelles parutions"
            magazines={magazines_publication_releases}
          />
        </ScrollView>
      </Container>
    );
  }
}

const mapStateTopProps = ({ magazine }) => {
  console.log(magazine);
  return {
    magazines_publication_releases: magazine.magazines_publication_releases,
    magazines_publication_releases_loading: magazine.magazines_publication_releases_loading,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchLatestMagazineReleases: () => dispatch(fetchLatestMagazineReleases()),
  };
};

export default connect(mapStateTopProps, mapDispatchToProps)(HomeScreen);

const Container = styled.View`
  flex: 1;
  background-color: ${dark};
`;
