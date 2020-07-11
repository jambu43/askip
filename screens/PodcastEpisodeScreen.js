import React from "react";
import styled from "styled-components";
import moment from "moment";
import HTML from "react-native-render-html";
import { TouchableOpacity, ActivityIndicator, View } from "react-native";
import { connect } from "react-redux";
import { dark, danger } from "../config/variables";
import { getPodcastById } from "../store/selectors/podcast";
import { BackIcon } from "../components/Icons";
import { assetsUrl, processPlaybackStatus, onLinkPress } from "../helpers";
import PlayBackWardButton from "../components/podcast/PlayBackWardButton";
import PlayButton from "../components/podcast/PlayButton";
import PlayForwardButton from "../components/podcast/PlayForwardButton";
import { Audio } from "expo-av";
import {
  setNowPlayingPlayBackStatus,
  setNowPlaying,
  setNowPlayingSoundObject,
} from "../store/actions/podcasts";
import { fetchPodcastComment, addPodcastComment } from "../store/actions/comments";
import { getPodcastComments, getPodcastCommentsLoading } from "../store/selectors/comment";
import CommentItem from "../components/askip/CommentItem";
import PostCommentInput from "../components/askip/PostCommentInput";

class PodcastEpisodeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      commenting: false,
      page: 1,
      isLoading: false,
    };
  }

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
    this.setState({
      isLoading: true,
    });
    const { podcast, now_playing } = this.props;
    await Audio.requestPermissionsAsync()
      .then(async (permission) => {
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
            console.log("_onPlaybackStatusUpdate");
            if (now_playing.soundObject) {
              await now_playing.soundObject.stopAsync();
            }

            soundObject = new Audio.Sound();
            soundObject.setOnPlaybackStatusUpdate(this._onPlaybackStatusUpdate.bind(this));
            soundObject.setProgressUpdateIntervalAsync(1000);
            let initialPlaybackObject = await soundObject.loadAsync(
              { uri: assetsUrl(this.props.podcast.file_path) },
              {},
              true
            );

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
      .catch((error) => {
        console.log("Error", error);
      });
    this.setState({
      isLoading: false,
    });
  }

  async componentDidMount() {
    const { now_playing } = this.props;
    const { playbackStatus } = now_playing;
    let play = this.props.navigation.getParam("play");
    if (play && !playbackStatus.isPlaying) {
      await this.handlePlayButtonClick();
    }
    let podcast_id = this.props.navigation.getParam("podcast_id");
    this.props.fetchPodcastComment(podcast_id, this.state.page);
  }

  _handleRefresh() {
    let podcast_id = this.props.navigation.getParam("podcast_id");
    this.props.fetchPodcastComment(podcast_id, 1);
  }

  _handleLoadMore() {
    let podcast_id = this.props.navigation.getParam("podcast_id");
    this.setState(
      (prevState, nextProps) => ({
        page: prevState.page + 1,
      }),
      () => {
        this.props.fetchPodcastComment(podcast_id, this.state.page);
      }
    );
  }

  handleCommentChange(text) {
    this.setState({
      content: text,
    });
  }

  handleCommentSubmit() {
    let podcast_id = this.props.navigation.getParam("podcast_id");
    this.setState({
      commenting: true,
    });
    this.props
      .addPodcastComment(podcast_id, {
        content: this.state.content,
      })
      .then(() => {
        this.setState({
          content: "",
          commenting: false,
        });
      })
      .catch(() => {
        this.setState({
          commenting: false,
        });
      });
  }

  renderHeader() {
    const { podcast, now_playing } = this.props;
    const { isLoading } = this.state;
    const { playbackStatus } = now_playing;

    let parsedContent = !podcast.content.match(/^<p>/)
      ? `<p>${podcast.content}</p>`
      : podcast.content;
    const {
      bufferingProgress,
      playingProgress,
      canGoBackward,
      canGoForward,
    } = processPlaybackStatus(playbackStatus);
    return (
      <PodcastContent>
        <ContentWrapper>
          <CoverImage source={{ uri: assetsUrl(podcast.cover_image) }} />
          <Title>{podcast.title}</Title>
          <MetaWrapper>
            <MetaItem>{moment(podcast.created_at).format("DD MMMM YYYY")}</MetaItem>
            <MetaItem> - </MetaItem>
            <MetaItem>
              {Math.floor(podcast.read_time / 60) + ":"}
              {Math.floor(podcast.read_time % 60)}
            </MetaItem>
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
            size={35}
            disabled={!canGoBackward}
          />
          <PlayButton
            is_playing={playbackStatus.isPlaying}
            is_loading={isLoading}
            size={35}
            onPress={this.handlePlayButtonClick.bind(this)}
          />
          <PlayForwardButton
            onPress={this.handlePlayForwardClick.bind(this)}
            disabled={!canGoForward}
            size={35}
          />
          {playbackStatus.isBuffering && playbackStatus.isPlaying ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : null}
        </PlayerControlWrapper>
        <HTML
          html={parsedContent}
          onLinkPress={onLinkPress}
          tagsStyles={{
            p: { color: "#fff", marginBottom: 5, fontSize: 16 },
            a: { color: danger, fontWeight: "bold" },
            li: { color: "#fff" },
          }}
        ></HTML>
      </PodcastContent>
    );
  }

  renderComment({ item }) {
    return <CommentItem comment={item} key={item.id} navigation={this.props.navigation} />;
  }
  render() {
    const { comments, comments_loading, now_playing, navigation } = this.props;
    const { content, commenting } = this.state;
    const isLoading = false;
    return (
      <Container>
        <Header>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <BackIcon fill="#fff" size={24} />
          </TouchableOpacity>
        </Header>
        {!isLoading ? (
          <Content
            keyExtractor={(item) => item.id.toString()}
            extraData={comments}
            data={comments}
            refreshing={comments_loading}
            onRefresh={this._handleRefresh.bind(this)}
            ListHeaderComponent={this.renderHeader.bind(this)}
            renderItem={this.renderComment.bind(this)}
            showsVerticalScrollIndicator={false}
            onEndReached={this._handleLoadMore.bind(this)}
            onEndReachedThreshold={0.5}
            initialNumToRender={10}
          />
        ) : null}
        {!isLoading ? (
          <PostCommentInput
            submitting={commenting}
            content={content}
            onSubmit={this.handleCommentSubmit.bind(this)}
            onChange={this.handleCommentChange.bind(this)}
          />
        ) : null}
        {!isLoading ? <View style={{ height: 0 }} /> : <ActivityIndicator color="#fff" />}
      </Container>
    );
  }
}

const Container = styled.View`
  background: ${dark};
  flex: 1;
  padding: 10px 0px;
  position: relative;
  flex-grow: 1;
`;
const Header = styled.View`
  margin-top: 24px;
  margin-bottom: 15px;
`;

const PodcastContent = styled.View`
  margin-bottom: 15px;
  padding: 0 15px;
`;

const Content = styled.FlatList``;

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
  width: ${(props) => `${props.progress}%`};
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
  width: ${(props) => `${props.progress}%`};
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
    comments: getPodcastComments(state, props),
    comments_loading: getPodcastCommentsLoading(state, props),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setNowPlaying: ({ soundObject, playbackStatus, podcast_id }) => {
      return dispatch(setNowPlaying({ soundObject, playbackStatus, podcast_id }));
    },
    setNowPlayingPlayBackStatus: (playbackStatus) => {
      return dispatch(setNowPlayingPlayBackStatus(playbackStatus));
    },
    setNowPlayingSoundObject: (soundObject) => {
      return dispatch(setNowPlayingSoundObject(soundObject));
    },
    fetchPodcastComment: (podcast_id, page) => dispatch(fetchPodcastComment(podcast_id, page)),
    addPodcastComment: (podcast_id, post) => dispatch(addPodcastComment(podcast_id, post)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PodcastEpisodeScreen);
