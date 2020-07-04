import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { getUserById, isUserLoading } from "../store/selectors/user";
import { fetchUserPosts } from "../store/actions/post";
import { fetchUserById, followUser } from "../store/actions/users";
import { getUsersPosts } from "../store/selectors/post";
import { dark, darkLighten } from "../config/variables";
import { View, ActivityIndicator, TouchableOpacity } from "react-native";
import { BackIcon } from "../components/Icons";
import PostCard from "../components/askip/PostCard";
import CertifiedIcon from "../components/generic/CertifiedIcon";

class ProfileScreen extends React.Component {
  state = {
    following_channel: false,
    page: 1,
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

  renderHeader() {
    const { user } = this.props;
    let has_followed = user ? this.props.followees_ids.includes(user.id.toString()) : null;
    const { following_channel } = this.state;
    let followIcon = has_followed
      ? require("../assets/followed.png")
      : require("../assets/plus.png");
    return (
      <View>
        <Card>
          <Avatar source={{ uri: user.avatar }} />
          <Information>
            <UsernameDivider>
              <Username>{user.name}</Username>
              {parseInt(user.is_certified) ? <CertifiedIcon /> : null}
            </UsernameDivider>
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
        <MagazineRecentlyRead>Mes publications</MagazineRecentlyRead>
      </View>
    );
  }

  _handleLoadMore = () => {
    const { navigation } = this.props;
    let user_id = navigation.getParam("user_id");
    this.setState(
      (prevState, nextProps) => ({
        page: prevState.page + 1,
      }),
      () => {
        this.props.fetchUserPosts(user_id, this.state.page);
      }
    );
  };

  _renderPost({ item, index }) {
    const { navigation } = this.props;
    return (
      <PostCard
        isDeletedPost={false}
        showSocialInteraction={true}
        post={item}
        navigation={navigation}
        key={item.id}
      />
    );
  }

  render() {
    const { user, user_posts, users_posts_loading, navigation } = this.props;
    let isLoading = !user;
    let user_id = navigation.getParam("user_id");
    let isUsersPostsLoading = users_posts_loading[user_id] ? users_posts_loading[user_id] : false;
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
            extraData={user_posts}
            data={user_posts}
            refreshing={isUsersPostsLoading}
            onRefresh={this._handleRefresh.bind(this)}
            ListHeaderComponent={this.renderHeader.bind(this)}
            renderItem={this._renderPost.bind(this)}
            showsVerticalScrollIndicator={true}
            onEndReached={this._handleLoadMore.bind(this)}
            onEndReachedThreshold={0.5}
            initialNumToRender={10}
          />
        ) : (
          <ActivityIndicator color="#fff" />
        )}
      </Container>
    );
  }
}

const Container = styled.View`
  flex: 1;
  background-color: ${dark};
  padding: 10px 0px;
`;

const Content = styled.FlatList``;

const Header = styled.View`
  margin-top: 24px;
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
  margin-right: 5px;
`;

const UsernameDivider = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Avatar = styled.Image`
  height: 90px;
  width: 90px;
  border-radius: 50px;
  background-color: #ffffff;
`;

const Information = styled.View`
  margin-top: 10px;
  flex: 1;
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
    fetchUserPosts: (user_id, page) => dispatch(fetchUserPosts(user_id, page)),
    fetchUserById: (user_id) => dispatch(fetchUserById(user_id)),
    followUser: (followee_id) => dispatch(followUser(followee_id)),
  };
};

const mapStateToProps = (state, ownProps) => {
  return {
    user: getUserById(state, ownProps),
    user_loading: isUserLoading(state, ownProps),
    user_posts: getUsersPosts(state, ownProps),
    users_posts_loading: state.post.users_posts_loading,
    followees_ids: state.auth.user.followees_ids,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);
