import React from "react";
import styled from "styled-components";
import AppHeader from "../components/generic/AppHeader";
import { dark } from "../config/variables";
import UserMagazine from "../components/home/UserMagazine";
import { ScrollView } from "react-native-gesture-handler";
import { connect } from "react-redux";
import { fetchLatestMagazineReleases } from "../store/actions/magazines";
import { fetchLatestArticles } from "../store/actions/articles";
import ArticleReleaseList from "../components/home/ArticleReleaseList";
import { getMagazinesReleases } from "../store/selectors/magazine";
import { getPosts } from "../store/selectors/post";
import { fetchUserPost } from "../store/actions/post";
import PostList from "../components/askip/PostList";

class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.fetchLatestMagazineReleases();
    this.props.fetchLatestArticles();
    this._fetchPostData();
  }

  _fetchPostData() {
    this.props.fetchUserPost(this.props.user.id);
  }

  render() {
    const {
      user,
      navigation,
      magazines_publication_releases,
      articles,
      onClick,
      posts,
    } = this.props;

    return (
      <Container>
        <AppHeader />
        <ScrollView>
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
          <ShowAskip>
            <ShowAskipText>Synchroniser depuis Facebook</ShowAskipText>
          </ShowAskip>

          <MagazineRecentlyRead>Mes Magazine</MagazineRecentlyRead>
          <CenterMagazineContent>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
              {magazines_publication_releases.map(magazine => (
                <UserMagazine navigation={navigation} magazine={magazine} key={magazine.id} />
              ))}
              <ShowMore source={require("../assets/chevron_right.png")} />
            </ScrollView>
          </CenterMagazineContent>
          <ArticleReleaseList navigation={navigation} title="Mes Articles" articles={articles} />

          <PostList navigation={navigation} posts={posts} />
        </ScrollView>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    magazines_publication_releases: getMagazinesReleases(state),
    articles: state.article.article_list,
    posts: getPosts(state),
    posts_loading: state.post.posts_loading,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    fetchLatestMagazineReleases: () => dispatch(fetchLatestMagazineReleases()),
    fetchLatestArticles: () => dispatch(fetchLatestArticles()),
    fetchUserPost: user_id => dispatch(fetchUserPost(user_id)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);

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

const ShowAskip = styled.TouchableOpacity`
  border: 2px #fff solid;
  padding: 10px 20px;
  border-radius: 8px;
  margin: 10px 20px 20px 10px;
`;
const ShowAskipText = styled.Text`
  color: #fff;
  text-align: center;
  font-size: 18px;
  font-weight: bold;
`;
const ShowMore = styled.Image`
  width: 30px;
  height: 30px;
  top: 35px;
  margin-left: 10px;
`;
const CenterMagazineContent = styled.View`
  justify-content: center;
`;
