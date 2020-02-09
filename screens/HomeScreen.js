import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { ScrollView } from "react-native";
import AppHeader from "../components/generic/AppHeader";
import MagazineReleaseList from "../components/home/MagazineReleaseList";
import { dark } from "../config/variables";
import { fetchLatestMagazineReleases } from "../store/actions/magazines";
import { fetchLatestPodcast } from "../store/actions/podcasts";
import SectionLatestPodcast from "../components/home/SectionLatestPodcast";
import { fetchLatestArticles } from "../store/actions/articles";
import ArticleReleaseList from "../components/home/ArticleReleaseList";

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.fetchLatestMagazineReleases();
    this.props.fetchLatestPodcast();
    this.props.fetchLatestArticles();
  }
  render() {
    const {
      navigation,
      magazines_publication_releases,
      latest_podcast,
      articles,
      articles_loading,
    } = this.props;
    return (
      <Container>
        <AppHeader />
        <ScrollView>
          <MagazineReleaseList
            navigation={navigation}
            title="Nouvelles parutions"
            magazines={magazines_publication_releases}
          />
          <ArticleReleaseList navigation={navigation} title="À la une" articles={articles} />
          {latest_podcast ? (
            <SectionLatestPodcast
              navigation={navigation}
              title="Dernière épisode du podcast"
              podcast={latest_podcast}
            />
          ) : null}
        </ScrollView>
      </Container>
    );
  }
}

const mapStateTopProps = ({ magazine, podcast, article }) => {
  return {
    magazines_publication_releases: magazine.magazines_publication_releases,
    magazines_publication_releases_loading: magazine.magazines_publication_releases_loading,
    latest_podcast: podcast.latest_podcast,
    articles: article.article_list,
    articles_loading: article.article_list_loading,
  };
};

const mapDispatchToProps = dispatch => {
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