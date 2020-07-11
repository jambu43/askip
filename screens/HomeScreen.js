import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { ScrollView, RefreshControl } from "react-native";
import AppHeader from "../components/generic/AppHeader";
import MagazineReleaseList from "../components/home/MagazineReleaseList";
import { dark } from "../config/variables";
import { fetchLatestMagazineReleases } from "../store/actions/magazines";
import { fetchLatestPodcast } from "../store/actions/podcasts";
import SectionLatestPodcast from "../components/home/SectionLatestPodcast";
import { fetchLatestArticles } from "../store/actions/articles";
import ArticleReleaseList from "../components/home/ArticleReleaseList";
import { getMagazinesReleases } from "../store/selectors/magazine";
import { getNewsArticles } from "../store/selectors/news";
import { setAxiosToken } from "../store/actions/auth";
import { getNowPlayingPodcastById } from "../store/selectors/podcast";

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    if (this.props.token) {
      setAxiosToken(this.props.token);
    }
    this.willFocusSubscription = this.props.navigation.addListener("willFocus", () => {
      this._fetchMagazineData();
    });
  }

  componentWillUnmount() {
    if (this.willFocusSubscription) {
      this.willFocusSubscription.remove();
    }
  }

  _fetchMagazineData() {
    this.props.fetchLatestMagazineReleases();
    this.props.fetchLatestPodcast();
    this.props.fetchLatestArticles();
  }

  _handleRefresh() {
    this._fetchMagazineData();
  }

  _nowPlaying() {
    const { latest_podcast, now_playing, now_playing_podcast } = this.props;
    return now_playing_podcast ? now_playing_podcast : latest_podcast;
  }

  render() {
    const {
      navigation,
      magazines_publication_releases,
      latest_podcast,
      articles,
      magazines_publication_releases_loading,
    } = this.props;
    return (
      <Container>
        <AppHeader />
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={magazines_publication_releases_loading}
              onRefresh={this._handleRefresh.bind(this)}
            />
          }
        >
          <MagazineReleaseList
            navigation={navigation}
            title="Nouvelles parutions"
            magazines={magazines_publication_releases}
          />
          {latest_podcast ? (
            <SectionLatestPodcast
              navigation={navigation}
              title="Dernière épisode du podcast"
              podcast={this._nowPlaying()}
            />
          ) : null}
          <ArticleReleaseList navigation={navigation} title="À la une" articles={articles} />
        </ScrollView>
      </Container>
    );
  }
}

const mapStateTopProps = (state) => {
  return {
    token: state.auth.token,
    magazines_publication_releases: getMagazinesReleases(state).slice(0, 4),
    magazines_publication_releases_loading: state.magazine.magazines_publication_releases_loading,
    latest_podcast: state.podcast.latest_podcast,
    articles: getNewsArticles(state).slice(0, 4),
    articles_loading: state.article.article_list_loading,
    now_playing: state.podcast.now_playing,
    now_playing_podcast: getNowPlayingPodcastById(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchLatestMagazineReleases: () => dispatch(fetchLatestMagazineReleases()),
    fetchLatestPodcast: () => dispatch(fetchLatestPodcast()),
    fetchLatestArticles: () => dispatch(fetchLatestArticles()),
  };
};

export default connect(mapStateTopProps, mapDispatchToProps)(HomeScreen);

const Container = styled.View`
  flex: 1;
  background-color: ${dark};
`;
