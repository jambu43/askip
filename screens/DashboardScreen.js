import React from "react";
import styled from "styled-components";
import AppHeader from "../components/generic/AppHeader";
import { dark } from "../config/variables";
import UserMagazine from "../components/home/UserMagazine";
import { ScrollView } from "react-native-gesture-handler";
import { connect } from "react-redux";
import { fetchLatestMagazineReleases } from "../store/actions/magazines";
import { fetchLatestArticles } from "../store/actions/articles";
import { getMagazinesReleases } from "../store/selectors/magazine";
import PostList from "../components/askip/PostList";
import { RefreshControl, View } from "react-native";
import { fetchMe } from "../store/actions/auth";

class DashboardScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchLatestMagazineReleases();
    this.props.fetchLatestArticles();
    this.props.fetchMe();
  }

  _handleRefresh() {
    this.props.fetchMe();
  }

  render() {
    const { user, isUserFetching, navigation, magazines_publication_releases } = this.props;
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
            <Count>
              <Avatar source={{ uri: user.avatar }} />
              <Username>{user.name}</Username>
            </Count>
            <Information>
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
            </Information>
          </Card>

          <MagazineRecentlyRead>Mes Magazine</MagazineRecentlyRead>
          <CenterMagazineContent>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
              {magazines_publication_releases
                .filter((item) => user.publication_releases_read.includes(item.id.toString()))
                .map((magazine) => (
                  <UserMagazine navigation={navigation} magazine={magazine} key={magazine.id} />
                ))}
            </ScrollView>
          </CenterMagazineContent>
          {user.posts.length ? (
            <View>
              <MagazineRecentlyRead>Mes publications</MagazineRecentlyRead>
              <PostList navigation={navigation} posts={user.posts} />
            </View>
          ) : null}
        </ScrollView>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    isUserFetching: state.auth.isUserFetching,
    magazines_publication_releases: getMagazinesReleases(state),
    articles: state.article.article_list,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchLatestMagazineReleases: () => dispatch(fetchLatestMagazineReleases()),
    fetchLatestArticles: () => dispatch(fetchLatestArticles()),
    fetchMe: () => dispatch(fetchMe()),
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
const Count = styled.View``;

const Username = styled.Text`
  color: #fff;
  text-align: center;
  margin-top: 10px;
  font-size: 13px;
  font-weight: 800;
  width: 100px;
`;

const Avatar = styled.Image`
  height: 90px;
  width: 90px;
  border-radius: 50px;
  background-color: #ffffff;
`;

const Information = styled.View`
  margin-top: 32px;
  flex-direction: row;
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

const CenterMagazineContent = styled.View`
  justify-content: center;
`;