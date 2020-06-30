import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { ActivityIndicator } from "react-native";
import { dark, darkLighten } from "../config/variables";
import { fetchUserPodcasts } from "../store/actions/podcasts";
import { getUserById, isUserLoading } from "../store/selectors/user";
import { assetsUrl } from "../helpers";
import AppHeader from "../components/generic/AppHeader";
import PodcastItem from "../components/podcasts/PodcastItem";
import { followUser } from "../store/actions/users";

class PodcastScreen extends React.Component {
  state = {
    following_channel: false,
  };

  componentDidMount() {
    this.props.fetchUserPodcasts();
  }

  toggleFollowChannel() {
    const { user } = this.props;
    this.setState({
      following_channel: true,
    });
    this.props
      .followUser(user.id)
      .then(() => {})
      .catch(() => {})
      .finally(() => {
        this.setState({
          following_channel: false,
        });
      });
  }

  render() {
    const { following_channel } = this.state;
    const { user, isUserLoading, podcasts, navigation, now_playing } = this.props;
    let has_followed = user ? this.props.followees_ids.includes(user.id.toString()) : null;
    const { playbackStatus } = now_playing;
    let followIcon = has_followed
      ? require("../assets/followed.png")
      : require("../assets/plus.png");
    return (
      <Container>
        <AppHeader />
        {isUserLoading || !user ? null : (
          <Content>
            <ChannelHeader>
              <ChannelLogo source={{ uri: assetsUrl(user.avatar) }} />
              <ChannelHeaderContent>
                <ChannelHeaderTitle>{user.name}</ChannelHeaderTitle>
                <ChannelHeaderDescription>{user.bio}</ChannelHeaderDescription>
              </ChannelHeaderContent>
            </ChannelHeader>
            <ChannelButtons>
              <ChannelFollowButton
                onPress={this.toggleFollowChannel.bind(this)}
                disabled={following_channel}
              >
                {following_channel ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <FollowIcon source={followIcon}></FollowIcon>
                )}
                <ChannelFollowButtonText>S'abonner</ChannelFollowButtonText>
              </ChannelFollowButton>
            </ChannelButtons>
            <PodcastSection>
              <PodcastSectionTitle>Épisodes disponibles</PodcastSectionTitle>
              {podcasts.map((podcast) => (
                <PodcastItem
                  navigation={navigation}
                  is_playing={
                    now_playing.podcast_id == podcast.id ? playbackStatus.isPlaying : false
                  }
                  podcast={podcast}
                  key={podcast.id}
                />
              ))}
            </PodcastSection>
          </Content>
        )}
      </Container>
    );
  }
}

const Container = styled.View`
  background: ${dark};
  flex: 1;
`;
const Content = styled.View`
  padding: 15px;
`;

const ChannelHeader = styled.View`
  flex-direction: row;
  align-items: center;
`;
const ChannelHeaderContent = styled.View`
  flex: 1;
`;
const ChannelHeaderTitle = styled.Text`
  color: #fff;
  font-size: 20px;
  font-weight: bold;
`;
const ChannelHeaderDescription = styled.Text`
  color: #fff;
  font-size: 13px;
`;

const FollowIcon = styled.Image`
  width: 10px;
  height: 10px;
  margin-right: 5px;
`;
const ChannelButtons = styled.View`
  margin: 10px 0px;
`;

const ChannelFollowButton = styled.TouchableOpacity`
  padding: 10px 24px;
  background: ${darkLighten};
  align-self: flex-start;
  border-radius: 5px;
  flex-direction: row;
  align-items: center;
`;
const ChannelFollowButtonText = styled.Text`
  color: #fff;
  font-size: 13px;
`;
const ChannelLogo = styled.Image`
  width: 80px;
  height: 80px;
  background: #fff;
  border-radius: 5px;
  margin-right: 10px;
`;

const PodcastSection = styled.View`
  margin: 10px 0px;
`;

const PodcastSectionTitle = styled.Text`
  color: #fff;
  font-size: 20px;
  text-transform: uppercase;
  font-weight: bold;
  margin-bottom: 10px;
`;

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserPodcasts: () => dispatch(fetchUserPodcasts()),
    followUser: (followee_id) => dispatch(followUser(followee_id)),
  };
};
const mapStateToProps = (state, props) => {
  return {
    podcasts: state.podcast.podcasts,
    user: getUserById(state, props),
    isUserLoading: isUserLoading(state, props),
    now_playing: state.podcast.now_playing,
    followees_ids: state.auth.user.followees_ids,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PodcastScreen);
