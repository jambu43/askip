import React from "react";
import styled from "styled-components";
import moment from "moment";
import HTML from "react-native-render-html";
import { TouchableOpacity, ActivityIndicator } from "react-native";
import { connect } from "react-redux";
import { dark, danger } from "../config/variables";
import { getPodcastById } from "../store/selectors/podcast";
import { BackIcon } from "../components/Icons";
import { assetsUrl, processPlaybackStatus } from "../helpers";
import PlayBackWardButton from "../components/podcast/PlayBackWardButton";
import PlayButton from "../components/podcast/PlayButton";
import PlayForwardButton from "../components/podcast/PlayForwardButton";
import { Audio } from "expo-av";
import {
  setNowPlayingPlayBackStatus,
  setNowPlaying,
  setNowPlayingSoundObject,
} from "../store/actions/podcasts";

class PodcastScreen extends React.Component {
  async _onPlaybackStatusUpdate(playbackStatus) {
    if (!playbackStatus.isLoaded) {
      // Update your UI for the unloaded state
      if (playbackStatus.error) {
        console.log(`Encountered a fatal error during playback: ${playbackStatus.error}`);
        // Send Expo team the error on Slack or the forums so we can help you debug!
      }
    } else {
      // Update your UI for the loaded state

      if (playbackStatus.isPlaying) {
        // Update your UI for the playing state
      } else {
        // Update your UI for the paused state
      }

      if (playbackStatus.isBuffering) {
        // Update your UI for the buffering state
      }

      if (playbackStatus.didJustFinish && !playbackStatus.isLooping) {
        // The player has just finished playing and will stop. Maybe you want to play something else?
        await this.props.now_playing.soundObject.stopAsync();
      }

      this.props.setNowPlayingPlayBackStatus(playbackStatus);
    }
  }

  async handlePlayForwardClick() {
    const { podcast, now_playing } = this.props;
    const { playbackStatus } = now_playing;
    if (now_playing.podcast_id === podcast.id) {
      let nextPosition = playbackStatus.positionMillis + 30000;
      nextPosition =
        nextPosition > playbackStatus.durationMillis ? playbackStatus.durationMillis : nextPosition;
      await now_playing.soundObject.setPositionAsync(nextPosition);
    }
  }

  async handlePlayBackwardClick() {
    const { podcast, now_playing } = this.props;
    const { playbackStatus } = now_playing;
    if (now_playing.podcast_id === podcast.id) {
      let nextPosition = playbackStatus.positionMillis - 10000;
      nextPosition = nextPosition < 0 ? 0 : nextPosition;
      await now_playing.soundObject.setPositionAsync(nextPosition);
    }
  }

  async handlePlayButtonClick() {
    const { podcast, now_playing } = this.props;
    Audio.requestPermissionsAsync()
      .then(async permission => {
        if (permission.granted) {
          let soundObject = null;
          if (now_playing.podcast_id === podcast.id) {
            soundObject = now_playing.soundObject;
            if (now_playing.playbackStatus.isPlaying) {
              await soundObject.pauseAsync();
            } else {
              await soundObject.playAsync();
            }
          } else {
            if (now_playing.soundObject) {
              await now_playing.soundObject.stopAsync();
            }

            soundObject = new Audio.Sound();
            let initialPlaybackObject = await soundObject.loadAsync(
              { uri: assetsUrl(this.props.podcast.file_path) },
              {},
              true
            );
            soundObject.setOnPlaybackStatusUpdate(this._onPlaybackStatusUpdate.bind(this));
            soundObject.setProgressUpdateIntervalAsync(1000);
            if (initialPlaybackObject.isLoaded) {
              await soundObject.playAsync();
              this.props.setNowPlaying({
                soundObject,
                playbackStatus: initialPlaybackObject,
                podcast_id: podcast.id,
              });
            }
          }
        }
      })
      .catch(error => {
        console.log("Error", error);
      });
  }

  async componentDidMount() {
    const { now_playing } = this.props;
    const { playbackStatus } = now_playing;
    let play = this.props.navigation.getParam("play");
    if (play && !playbackStatus.isPlaying) {
      await this.handlePlayButtonClick();
    }
  }
  render() {
    const { podcast, now_playing, navigation } = this.props;
    const { playbackStatus } = now_playing;
    const {
      bufferingProgress,
      playingProgress,
      canGoBackward,
      canGoForward,
    } = processPlaybackStatus(playbackStatus);
    return (
      <Container>
        <Header>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <BackIcon fill="#fff" size={34} />
          </TouchableOpacity>
        </Header>
        <ContentWrapper>
          <CoverImage source={{ uri: assetsUrl(podcast.cover_image) }} />
          <Title>{podcast.title}</Title>
          <MetaWrapper>
            <MetaItem>{moment(podcast.created_at).format("DD MMMM YYYY")}</MetaItem>
            <MetaItem> - </MetaItem>
            <MetaItem>{podcast.read_time}</MetaItem>
            <MetaItem> - </MetaItem>
            <MetaItem>{podcast.file_size}MB</MetaItem>
          </MetaWrapper>
        </ContentWrapper>
        <ProgressWrapper>
          <PlayingProgress progress={playingProgress}></PlayingProgress>
          <BufferingProgress progress={bufferingProgress}></BufferingProgress>
        </ProgressWrapper>
        <PlayerControlWrapper>
          <PlayBackWardButton
            onPress={this.handlePlayBackwardClick.bind(this)}
            size={30}
            disabled={!canGoBackward}
          />
          <PlayButton
            is_playing={playbackStatus.isPlaying}
            is_loading={playbackStatus.isBuffering}
            size={30}
            onPress={this.handlePlayButtonClick.bind(this)}
          />
          <PlayForwardButton
            onPress={this.handlePlayForwardClick.bind(this)}
            disabled={!canGoForward}
            size={30}
          />
          {playbackStatus.isBuffering && playbackStatus.isPlaying ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : null}
        </PlayerControlWrapper>
        <HTML html={podcast.content} tagsStyles={{ p: { color: "#fff" } }}></HTML>
      </Container>
    );
  }
}

const Container = styled.View`
  background: ${dark};
  flex: 1;
  padding: 10px 15px;
`;
const Header = styled.View`
  margin-top: 24px;
  margin-bottom: 15px;
`;

const PlayerControlWrapper = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

const ProgressWrapper = styled.View`
  border-radius: 5px;
  height: 7px;
  background: #fff;
  margin: 10px 0px;
  position: relative;
`;
const PlayingProgress = styled.View`
  border-radius: 5px;
  background: ${danger};
  height: 7px;
  width: ${props => `${props.progress}%`};
  position: absolute;
  left: 0px;
  top: 0px;
  bottom: 0px;
  right: 0px;
  z-index: 2;
`;
const BufferingProgress = styled.View`
  border-radius: 5px;
  background: #aaa;
  height: 7px;
  width: ${props => `${props.progress}%`};
  position: relative;
  left: 0px;
  top: 0px;
  z-index: 1;
`;

const Title = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #fff;
  text-align: left;
`;

const MetaWrapper = styled.View`
  flex-direction: row;
`;
const MetaItem = styled.Text`
  color: #fff;
`;

const CoverImage = styled.Image`
  width: 100%;
  height: 180px;
  margin-bottom: 10px;
`;

const ContentWrapper = styled.View`
  margin-bottom: 10px;
`;
const mapStateToProps = (state, props) => {
  return {
    now_playing: state.podcast.now_playing,
    podcast: getPodcastById(state, props),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setNowPlaying: ({ soundObject, playbackStatus, podcast_id }) => {
      return dispatch(setNowPlaying({ soundObject, playbackStatus, podcast_id }));
    },
    setNowPlayingPlayBackStatus: playbackStatus => {
      return dispatch(setNowPlayingPlayBackStatus(playbackStatus));
    },
    setNowPlayingSoundObject: soundObject => {
      return dispatch(setNowPlayingSoundObject(soundObject));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PodcastScreen);
