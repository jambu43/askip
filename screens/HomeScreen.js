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
  render() {
    const mostListenedPlaylist = [...albums];
    return (
      <ScrollView>
        <Container>
          <AppHeader />
          <AlbumList title="Nouveautés" albums={albums} />
          <AlbumList
            title="Playlists les plus écoutées"
            albums={mostListenedPlaylist.slice(0, 5).reverse()}
          />
          <PremiumCallToAction />
          <CastingList castings={castings} title="Les castings du moment" />
          <ArtistList title="Les tops artistes" artists={artists.slice(0, 9)} />
          <GenderList title="Genre de musique" genders={genders} />
        </Container>
      </ScrollView>
    );
  }
}

const Container = styled.View`
  flex: 1;
`;
