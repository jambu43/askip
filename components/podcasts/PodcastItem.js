import React from "react";
import styled from "styled-components";
import moment from "moment";
import PlayButton from "../podcast/PlayButton";

const PodcastItem = ({ podcast, navigation, is_playing }) => {
  return (
    <Container
      onPress={() => navigation.navigate("PodcastEpisode", { podcast_id: podcast.id, play: true })}
    >
      <Wrapper>
        <PodcastTitle>{podcast.title}</PodcastTitle>
        <PodcastMetaWrapper>
          <PodcastMeta>{moment(podcast.created_at).format("DD MMM YYYY")}</PodcastMeta>
          <PodcastMeta> - </PodcastMeta>
          <PodcastMeta>{Math.ceil(podcast.read_time / 60)}min</PodcastMeta>
          <PodcastMeta> - </PodcastMeta>
          <PodcastMeta>{podcast.file_size}MB</PodcastMeta>
        </PodcastMetaWrapper>
      </Wrapper>
      <PlayButton is_playing={is_playing} size={24} />
    </Container>
  );
};

const Container = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  border-bottom-width: 1px;
  border-color: #92929d;
  padding-bottom: 5px;
`;
const Wrapper = styled.View`
  flex: 1;
`;
const PodcastTitle = styled.Text`
  color: #fff;
  font-weight: bold;
`;
const PodcastMetaWrapper = styled.View`
  flex-direction: row;
`;
const PodcastMeta = styled.Text`
  color: #92929d;
`;

export default PodcastItem;
