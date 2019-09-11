import React from "react";
import styled from "styled-components";
import { Slider } from "react-native";
import { PlayIcon } from "../Icons";

export const CastingCard = ({ casting }) => (
  <Container>
    <CastingAuthorAvatar source={{ uri: casting.artist.picture_path }} />
    <Content>
      <CastingTitle>{casting.title}</CastingTitle>
      <CastingDescription>{casting.description}</CastingDescription>
      <CastingAuthor>
        <AlbumCover source={{ uri: casting.album.coverPicture }} />
        <AlbumPlayer>
          <PlayIcon fill="#2692b7" />
          <AlbumPlayerSlider
            minimumValue={0}
            maximumValue={100}
            step={1}
            thumbTintColor="#2692b7"
          />
        </AlbumPlayer>
      </CastingAuthor>
    </Content>
  </Container>
);

const Container = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  width: 320px;
  margin-right: 15px;
`;
const CastingAuthorAvatar = styled.Image`
  height: 90px;
  width: 90px;
  background: #f1f1f1;
  border-radius: 5px;
  margin-right: 5px;
  flex-wrap: wrap;
`;
const AlbumCover = styled.Image`
  width: 24px;
  height: 24px;
  border-radius: 12px;
  margin-right: 5px;
`;
const Content = styled.View``;
const CastingTitle = styled.Text`
  font-size: 16px;
  flex-wrap: wrap;
  font-weight: bold;
  flex-wrap: wrap;
  max-width: 170px;
`;
const CastingDescription = styled.Text`
  text-align: left;
  color: #92929d;
  margin-bottom: 5px;
`;
const CastingAuthor = styled.View`
  flex-direction: row;
  width: 100%;
  align-items: center;
`;
const AlbumPlayer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;
const AlbumPlayerSlider = styled.Slider`
  flex: 1;
`;
