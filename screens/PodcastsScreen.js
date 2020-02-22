import React from "react";
import styled from "styled-components";
import AppHeader from "../components/generic/AppHeader";
import { connect } from "react-redux";
import { dark, darkLighten } from "../config/variables";
import { fetchUserPodcasts } from "../store/actions/podcasts";
import { getUserById, isUserLoading } from "../store/selectors/user";
import { assetsUrl } from "../helpers";

class PodcastsScreen extends React.Component {
  componentDidMount() {
    this.props.fetchUserPodcasts();
  }

  render() {
    const { user, isUserLoading } = this.props;
    console.log(user, isUserLoading);
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
              <ChannelFollowButton>
                <ChannelFollowButtonText>S'abonner</ChannelFollowButtonText>
              </ChannelFollowButton>
            </ChannelButtons>
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
const ChannelButtons = styled.View`
  margin: 10px 0px;
`;

const ChannelFollowButton = styled.TouchableOpacity`
  padding: 10px 24px;
  background: ${darkLighten};
  align-self: flex-start;
  border-radius: 5px;
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

const mapDispatchToProps = dispatch => {
  return {
    fetchUserPodcasts: () => dispatch(fetchUserPodcasts()),
  };
};
const mapStateToProps = (state, props) => {
  return {
    podcasts: state.podcast.podcasts,
    user: getUserById(state, props),
    isUserLoading: isUserLoading(state, props),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PodcastsScreen);
