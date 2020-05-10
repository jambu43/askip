import React from "react";
import styled from "styled-components";
import AppHeader from "../components/generic/AppHeader";
import { dark, darkLighten } from "../config/variables";
import { ScrollView } from "react-native";
import { connect } from "react-redux";
import { fetchLatestMagazineReleases } from "../store/actions/magazines";
import { fetchLatestArticles } from "../store/actions/articles";
import { getMagazinesReleases } from "../store/selectors/magazine";
import { RefreshControl, View } from "react-native";
import { fetchMe } from "../store/actions/auth";
import { getUsersPosts } from "../store/selectors/post";
import { fetchUserPosts } from "../store/actions/post";
import DashboardItem from "../components/dashboard/DashboardItem";

class DashboardScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { user } = this.props;
    this.props.fetchLatestMagazineReleases();
    this.props.fetchLatestArticles();
    this.props.fetchMe();
    this.props.fetchUserPosts(user.id);
  }

  _handleRefresh() {
    const { user } = this.props;
    this.props.fetchMe();
    this.props.fetchUserPosts(user.id);
  }

  render() {
    const {
      user,
      isUserFetching,
      navigation,
      magazines_publication_releases,
      user_posts,
    } = this.props;
    return (
      <Container>
        <AppHeader />
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={isUserFetching}
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
          <View>
            <DashboardItem
              title="Mes notifications"
              count={user.followees_count}
              isBadge={true}
              onPress={() => navigation.navigate("Notifications")}
            />
            <DashboardItem
              even={true}
              title="Mes publications"
              count={user.posts_count}
              onPress={() => navigation.navigate("UserPublications")}
            />
            <DashboardItem
              title="Mes abonnés"
              count={user.followers_count}
              onPress={() => navigation.navigate("UserFollowers")}
            />
            <DashboardItem
              even={true}
              title="Mes abonnements"
              count={user.followees_count}
              onPress={() => navigation.navigate("UserFollowees")}
            />
          </View>
        </ScrollView>
      </Container>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.auth.user,
    isUserFetching: state.auth.isUserFetching,
    magazines_publication_releases: getMagazinesReleases(state),
    articles: state.article.article_list,
    user_posts: getUsersPosts(state, ownProps),
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchLatestMagazineReleases: () => dispatch(fetchLatestMagazineReleases()),
    fetchLatestArticles: () => dispatch(fetchLatestArticles()),
    fetchMe: () => dispatch(fetchMe()),
    fetchUserPosts: (user_id) => dispatch(fetchUserPosts(user_id)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(DashboardScreen);

const Container = styled.View`
  flex: 1;
  background-color: ${dark};
`;

const Card = styled.View`
  margin: 10px 10px;
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

const Divider = styled.View`
  background-color: ${darkLighten};
  padding: 5px;
`;
