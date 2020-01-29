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
          <CastingList castings={castings} title="Les castings du moment" />
          <GenderList title="Explorez par genre de musique" genders={genders} />
          <AlbumList
            title="Les chansons les plus remixées"
            albums={mostListenedPlaylist.slice(0, 5).reverse()}
          />
          <PremiumCallToAction />
          <ArtistList
            navigation={navigation}
            title="Chantez avec les artistes"
            artists={artists.slice(0, 9)}
          />
        </ScrollView>
      </Container>
    );
  }
}

const Container = styled.View`
  flex: 1;
`;
