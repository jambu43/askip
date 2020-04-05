import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { dark, darkLighten, danger } from "../config/variables";
import { fetchArticleById, readArticle, fetchSimilarArticles } from "../store/actions/articles";
import { Entypo } from "@expo/vector-icons";
import { cutText, assetsUrl } from "../helpers";
import HTML from "react-native-render-html";
import { getNewsArticleById, getSimilarArticles } from "../store/selectors/news";
import SimilarArticleItem from "../components/magazine/SimilarArticleItem";

class NewsScreen extends React.Component {
  componentDidMount() {
    let article_id = this.props.navigation.getParam("article_id");
    this.props.fetchArticleById(article_id, true);
    this.props.readArticle(article_id);
    this.props.getSimilarArticles(article_id);
  }

  render() {
    const { navigation, article, article_loading, similar_articles } = this.props;
    let isArticleLoading = article_loading[article.id] ? article_loading[article.id] : false;
    return (
      <Container>
        <StickyHeader onPress={() => navigation.goBack()}>
          <Entypo name="chevron-left" size={24} color="#fff" />
          <MagazineReleaseInfo>
            <PublishedInText>Publié dans</PublishedInText>
            <MagazineReleaseTitle>
              {cutText(article.publication_release.title, 25)}
            </MagazineReleaseTitle>
          </MagazineReleaseInfo>
        </StickyHeader>
        <Content>
          <ArticleContentWrapper>
            <Title>{article.title}</Title>
            {!isArticleLoading && article.read_time ? (
              <MetaWrapper>
                <MetaItem>{Math.ceil(article.read_time / 60)} minute(s)</MetaItem>
              </MetaWrapper>
            ) : null}
          </ArticleContentWrapper>
          <ArticleFeaturedImageWrapper>
            <ArticleFeaturedImage
              source={{ uri: assetsUrl(article.featured_image) }}
            ></ArticleFeaturedImage>
          </ArticleFeaturedImageWrapper>
          <ArticleContentWrapper>
            {!isArticleLoading ? (
              <HTML
                html={article.content}
                tagsStyles={{
                  p: { color: "#fff", marginBottom: 5, fontSize: 16 },
                  a: { color: danger, fontWeight: "bold" },
                }}
              ></HTML>
            ) : null}
          </ArticleContentWrapper>
          <ArticleContentWrapper>
            <Title>A lire aussi</Title>
            {similar_articles.map((item) => {
              return <SimilarArticleItem key={item.id} article={item} navigation={navigation} />;
            })}
          </ArticleContentWrapper>
        </Content>
      </Container>
    );
  }
}

const Container = styled.View`
  flex: 1;
  background-color: ${dark};
  position: relative;
  margin-top: 24px;
`;
const StickyHeader = styled.TouchableOpacity`
  background: ${darkLighten};
  align-items: center;
  flex-direction: row;
  z-index: 10px;
  width: 100%;
  padding: 10px;
`;
const MagazineReleaseInfo = styled.View`
  margin-left: 5px;
`;
const PublishedInText = styled.Text`
  font-size: 12px;
  color: #fff;
`;
const MagazineReleaseTitle = styled.Text`
  font-size: 16px;
  color: #fff;
`;

const Title = styled.Text`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #fff;
`;

const MetaWrapper = styled.View`
  flex-direction: row;
`;
const MetaItem = styled.Text`
  color: #fff;
`;

const Content = styled.ScrollView``;

const ArticleContentWrapper = styled.View`
  padding: 15px;
`;

const Description = styled.Text`
  color: #fff;
`;

const ArticleFeaturedImageWrapper = styled.View``;
const ArticleFeaturedImage = styled.Image`
  width: 100%;
  height: 320px;
`;

const mapStateToProps = (state, props) => {
  return {
    article: getNewsArticleById(state, props),
    article_loading: state.article.article_loading,
    similar_articles: getSimilarArticles(state, props),
  };
};

const madDispatchToProps = (dispatch) => {
  return {
    fetchArticleById: (article_id) => dispatch(fetchArticleById(article_id)),
    readArticle: (article_id) => dispatch(readArticle(article_id)),
    getSimilarArticles: (article_id) => dispatch(fetchSimilarArticles(article_id)),
  };
};

export default connect(mapStateToProps, madDispatchToProps)(NewsScreen);
