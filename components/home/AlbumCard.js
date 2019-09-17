import React from "react";
import styled from "styled-components";

const AlbumCard = ({ album }) => (
  <Container>
    <CoverImage source={{ uri: album.coverPicture }} />
    <AlbumTitle>{album.songTitle}</AlbumTitle>
    <AlbumTitleCount>
      {Math.ceil(parseInt(album.artistId) / 10)} remix
    </AlbumTitleCount>
  </Container>
);

const Container = styled.View`
  width: 80px;
  height: auto;
  margin-right: 15px;
`;
const CoverImage = styled.Image`
  width: 100%;
  height: 90px;
  background: #f1f1f1;
  border-radius: 8px;
  margin-bottom: 5px;
`;
const AlbumTitle = styled.Text`
  color: #23232a;
  font-weight: bold;
  font-size: 12px;
  margin-bottom: 5px;
`;
const AlbumTitleCount = styled.Text`
  color: #92929d;
  font-size: 12px;
`;

export default AlbumCard;
