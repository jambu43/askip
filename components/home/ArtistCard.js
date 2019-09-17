import React from "react";
import styled from "styled-components";
import { cutText } from "../../helpers";

const ArtistCard = ({ artist }) => (
  <Container>
    <ArtistImage source={{ uri: artist.picture_path }} />
    <ArtistName>{cutText(artist.artist_name, 12)}</ArtistName>
    <ArtistFans>{Math.ceil(Math.random() * 100)} fans</ArtistFans>
  </Container>
);

const Container = styled.View`
  width: 90px;
  height: auto;
  margin-right: 15px;
  align-items: center;
`;
const ArtistImage = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: 60px;
  background: #f1f1f1;
  margin-bottom: 5px;
`;
const ArtistName = styled.Text`
  color: #23232a;
  font-weight: bold;
  font-size: 12px;
  margin-bottom: 5px;
  text-align: center;
`;
const ArtistFans = styled.Text`
  color: #92929d;
  font-size: 12px;
`;

export default ArtistCard;
