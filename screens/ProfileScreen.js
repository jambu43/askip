import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import PostList from "../components/askip/PostList";
import { getUserById, isUserLoading } from "../store/selectors/user";
import { fetchUserPosts } from "../store/actions/post";
import { fetchUserById, followUser } from "../store/actions/users";
import { getUsersPosts } from "../store/selectors/post";
import { dark, darkLighten } from "../config/variables";
import AppHeader from "../components/generic/AppHeader";
import {
  ScrollView,
  RefreshControl,
  View,
  ActivityIndicator,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { BackIcon } from "../components/Icons";

class ProfileScreen extends React.Component {
  state = {
    following_channel: false,
  };

  componentDidMount() {
    const { navigation } = this.props;
    let user_id = navigation.getParam("user_id");
    this.props.fetchUserPosts(user_id);
    this.props.fetchUserById(user_id);
  }

  _handleRefresh() {
    const { navigation } = this.props;
    let user_id = navigation.getParam("user_id");
    this.props.fetchUserById(user_id);
  }

  toggleFollowUser() {
    const { navigation } = this.props;
    let user_id = navigation.getParam("user_id");
    this.setState({
      following_channel: true,
    });
    this.props
      .followUser(user_id)
      .then(() => {
        this._handleRefresh();
      })
      .catch(() => {})
      .finally(() => {
        this.setState({
          following_channel: false,
        });
      });
  }

  render() {
    const { following_channel } = this.state;
    const { user, user_loading, user_posts, navigation } = this.props;
    let has_followed = user ? this.props.followees_ids.includes(user.id.toString()) : null;
    let followIcon = has_followed
      ? require("../assets/followed.png")
      : require("../assets/plus.png");
    let isLoading = !user;
    return (
      <Container>
        <Header>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <BackIcon fill="#fff" size={24} />
          </TouchableOpacity>
        </Header>
        {!isLoading ? (
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={user_loading}
                onRefresh={this._handleRefresh.bind(this)}
              />
            }
          >
            <Card>
              <Avatar source={{ uri: user.avatar }} />
              <Information>
                <Username>{user.name}</Username>
                <CountWrapper>
                  <Publication>
                    <Number>{user.posts_count}</Number>
                    <Title>Publications</Title>
                  </Publication>
                  <Publication>
                    <Number>{user.followers_count}</Number>
                    <Title>Abonnés</Title>
                  </Publication>
                  <Publication>
                    <Number>{user.followees_count}</Number>
                    <Title>Abonnements</Title>
                  </Publication>
                </CountWrapper>
              </Information>
            </Card>
            <ProfileDetails>
              <ChannelFollowButton
                onPress={this.toggleFollowUser.bind(this)}
                disabled={following_channel}
              >
                {following_channel ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <FollowIcon source={followIcon}></FollowIcon>
                )}
                <ChannelFollowButtonText>S'abonner</ChannelFollowButtonText>
              </ChannelFollowButton>
            </ProfileDetails>
            {user_posts.length ? (
              <View>
                <MagazineRecentlyRead>Mes publications</MagazineRecentlyRead>
                <PostList navigation={navigation} posts={user_posts} />
              </View>
            ) : null}
          </ScrollView>
        ) : null}
      </Container>
    );
  }
}

const Container = styled.View`
  flex: 1;
  background-color: ${dark};
  padding: 10px 0px;
`;

const Header = styled.View`
  margin-top: 15px;
  padding: 7.5px 0px;
`;

const Card = styled.View`
  margin: 0px 10px;
  flex-direction: row;
`;
const CountWrapper = styled.View`
  flex-direction: row;
`;

const Username = styled.Text`
  color: #fff;
  margin-left: 10px;
  font-size: 20px;
  font-weight: bold;
`;

const Avatar = styled.Image`
  height: 90px;
  width: 90px;
  border-radius: 50px;
  background-color: #ffffff;
`;

const Information = styled.View`
  margin-top: 10px;
`;

const Publication = styled.View`
  margin-left: 10px;
`;

const Number = styled.Text`
  font-size: 15px;
  font-weight: 600;
  text-align: center;
  color: #ffffff;
`;

const Title = styled.Text`
  font-size: 13px;
  color: #ffffff;
  padding-left: 3px;
`;

const MagazineRecentlyRead = styled.Text`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
  margin-top: 10px;
  color: #fff;
  text-transform: uppercase;
  margin-left: 10px;
`;

const FollowIcon = styled.Image`
  width: 10px;
  height: 10px;
  margin-right: 5px;
`;
const ProfileDetails = styled.View`
  margin: 10px 0px;
  padding: 0 15px;
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

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserPosts: (user_id) => dispatch(fetchUserPosts(user_id)),
    fetchUserById: (user_id) => dispatch(fetchUserById(user_id)),
    followUser: (followee_id) => dispatch(followUser(followee_id)),
  };
};

const mapStateToProps = (state, ownProps) => {
  return {
    user: getUserById(state, ownProps),
    user_loading: isUserLoading(state, ownProps),
    user_posts: getUsersPosts(state, ownProps),
    followees_ids: state.auth.user.followees_ids,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);
