import React from "react";
import styled from "styled-components";
import { ScrollView } from "react-native";
import AppHeader from "../components/generic/AppHeader";
import { AlbumList } from "../components/home/AlbumList";
import { artists } from "../config/artists";
import { albums } from "../config/albums";
import { castings } from "../config/castings";
import { genders } from "../config/genders";
import PremiumCallToAction from "../components/home/PremiumCallToAction";
import { CastingList } from "../components/home/CastingList";
import { ArtistList } from "../components/home/ArtistList";
import { GenderList } from "../components/home/GenderList";
import { dark } from "../config/variables";

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { navigation } = this.props;
    const mostListenedPlaylist = [...albums];
    return (
      <Container>
        <AppHeader />
        <ScrollView>
          <ArtistList
            navigation={navigation}
            title="Nouvelles parutions"
            artists={artists.slice(0, 9)}
          />
        </ScrollView>
      </Container>
    );
  }
}

const Container = styled.View`
  flex: 1;
  background-color: ${dark};
`;
