import React from "react";
import styled from "styled-components";
import { PlayIcon, MedalIcon, HeartIcon } from "../Icons";

export const CastingCard = ({ casting }) => (
  <Container>
    <CastingAuthorAvatar source={{ uri: casting.artist.picture_path }} />
    <Content>
      <CastingTitle>{casting.title}</CastingTitle>
      <CastingAuthor>
        <MedalIcon size={16} fill="#31c69c" />
        <CastingAuthorName>{casting.artist.artist_name}</CastingAuthorName>
      </CastingAuthor>
      <CastingStats>
        <CastingStatsItem>
          <PlayIcon fill="#474747" size={18} />
          <CastingStatsItemText>75K</CastingStatsItemText>
        </CastingStatsItem>

        <CastingStatsItem>
          <HeartIcon fill="#474747" size={18} />
          <CastingStatsItemText>1.5K</CastingStatsItemText>
        </CastingStatsItem>
      </CastingStats>
    </Content>
  </Container>
);

const Container = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  width: auto;
  margin-right: 15px;
  align-items: center;
`;
const CastingAuthorAvatar = styled.Image`
  height: 80px;
  width: 80px;
  background: #f1f1f1;
  border-radius: 5px;
  margin-right: 10px;
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
const CastingStats = styled.View`
  flex-direction: row;
`;
const CastingStatsItem = styled.View`
  flex-direction: row;
  margin-right: 10px;
`;
const CastingAuthor = styled.View`
  flex-direction: row;
  width: 100%;
  align-items: center;
  margin: 5px 0;
`;
const CastingAuthorName = styled.Text`
  font-size: 12px;
  margin-right: 10px;
`;
const CastingStatsItemText = styled.Text`
  margin-left: 5px;
`;
