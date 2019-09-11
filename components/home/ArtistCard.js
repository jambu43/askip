import React from "react";
import styled from "styled-components";

const ArtistCard = ({ artist }) => (
  <Container>
    <ArtistImage source={{ uri: artist.picture_path }} />
    <ArtistName>{artist.artist_name}</ArtistName>
    <ArtistFans>{Math.ceil(Math.random() * 100)} fans</ArtistFans>
  </Container>
);

const Container = styled.View`
  width: 140px;
  height: auto;
  margin-right: 15px;
  align-items: center;
`;
const ArtistImage = styled.Image`
  width: 120px;
  height: 120px;
  border-radius: 60px;
  background: #f1f1f1;
  margin-bottom: 5px;
`;
const ArtistName = styled.Text`
  color: #23232a;
  font-weight: bold;
  font-size: 15px;
  margin-bottom: 5px;
  text-align: center;
`;
const ArtistFans = styled.Text`
  color: #92929d;
  font-size: 12px;
`;

export default ArtistCard;
