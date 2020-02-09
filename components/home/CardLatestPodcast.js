import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { danger } from "../../config/variables";
import { apiUrl, assetsUrl } from "../../helpers";
import PlayButton from "../podcast/PlayButton";
import PlayBackWardButton from "../podcast/PlayBackWardButton";
import PlayForwardButton from "../podcast/PlayForWardButton";

class CardLatestPodcast extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { podcast } = this.props;
    return (
      <Container>
        <CoverImage source={{ uri: assetsUrl(podcast.cover_image) }} />
        <Title>{podcast.title}</Title>
        <PlayerControlWrapper>
          <PlayBackWardButton size={30} disabled={false} />
          <PlayButton is_playing={false} size={45} />
          <PlayForwardButton disabled={false} size={30} />
        </PlayerControlWrapper>
        <ProgressWrapper>
          <ProgressInner progress={50}></ProgressInner>
        </ProgressWrapper>
        <MorePodcastButton>
          <MorePodcastButtonText>Voir d’autres épisodes</MorePodcastButtonText>
        </MorePodcastButton>
      </Container>
    );
  }
}

const Container = styled.View`
  padding: 0;
`;
const Title = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #fff;
  text-align: center;
`;

const CoverImage = styled.Image`
  width: 100%;
  height: 180px;
  margin-bottom: 10px;
`;
const MorePodcastButton = styled.TouchableOpacity`
  border: 2px #fff solid;
  padding: 10px 20px;
  border-radius: 8px;
`;
const MorePodcastButtonText = styled.Text`
  color: #fff;
  text-align: center;
  font-size: 18px;
  font-weight: bold;
`;

const PlayerControlWrapper = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const ProgressWrapper = styled.View`
  border-radius: 5px;
  height: 7px;
  background: #fff;
  margin: 10px 0px;
`;
const ProgressInner = styled.View`
  border-radius: 5px;
  background: ${danger};
  height: 7px;
  width: ${props => `${props.progress}%`};
`;
const mapStateToProps = state => {
  return {};
};

export default connect(mapStateToProps)(CardLatestPodcast);
