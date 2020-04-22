import React from "react";
import HTML from "react-native-render-html";
import { connect } from "react-redux";
import styled from "styled-components";
import { dark, darkLighten } from "../config/variables";
import {
  getArticleById,
  getMagazineReleaseById,
  getMagazineReleaseNextArticle,
  getMagazineReleasePrevArticle,
} from "../store/selectors/magazine";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import { assetsUrl, cutText } from "../helpers";
import { fetchArticleById, readArticle, getSimilarArticles } from "../store/actions/articles";

class ArticleScreen extends React.Component {
  state = {
    fontSize: "small",
    fontSizes: ["small", "medium", "large"],
  };

  handleFontSizeChange() {
    let fontSize = this.state.fontSize;
    let nextFontSizeIndex =
      (this.state.fontSizes.indexOf(fontSize) + 1) % this.state.fontSizes.length;
    let nextFontSize = this.state.fontSizes[nextFontSizeIndex];
    this.setState({
      fontSize: nextFontSize,
    });
  }
  componentDidMount() {
    let article_id = this.props.navigation.getParam("article_id");
    this.props.fetchArticleById(article_id, true);
    this.props.readArticle(article_id);
  }

  render() {
    const { fontSize } = this.state;
    const { navigation, article, article_loading, nextArticle, prevArticle } = this.props;
    let isArticleLoading = article_loading[article.id] ? article_loading[article.id] : false;
    let magazineReleaseId = navigation.getParam("magazine_release_id");
    let pFontSize;
    switch (fontSize) {
      case "medium":
        pFontSize = 18;
        break;
      case "large":
        pFontSize = 20;
        break;
      default:
        pFontSize = 16;
    }
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
                tagsStyles={{ p: { color: "#fff", marginBottom: 5, fontSize: pFontSize } }}
              ></HTML>
            ) : null}
          </ArticleContentWrapper>
        </Content>
        <StickyBottomMenu>
          {prevArticle ? (
            <NextArticleWrapper
              onPress={() =>
                navigation.navigate("Article", {
                  article_id: prevArticle.id,
                  magazine_release_id: magazineReleaseId,
                })
              }
            >
              <Entypo name="chevron-left" size={24} color="#fff" />
              <NextArticleTitle>{cutText(prevArticle.title, 15)}</NextArticleTitle>
            </NextArticleWrapper>
          ) : null}
          <FontSizeSwitcher onPress={this.handleFontSizeChange.bind(this)}>
            <MaterialIcons name="format-size" size={24} color="#fff" />
          </FontSizeSwitcher>
          {nextArticle ? (
            <NextArticleWrapper
              onPress={() =>
                navigation.navigate("Article", {
                  article_id: nextArticle.id,
                  magazine_release_id: magazineReleaseId,
                })
              }
            >
              <NextArticleTitle>{cutText(nextArticle.title, 15)}</NextArticleTitle>
              <Entypo name="chevron-right" size={24} color="#fff" />
            </NextArticleWrapper>
          ) : null}
        </StickyBottomMenu>
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

const StickyBottomMenu = styled.View`
  background: ${darkLighten};
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
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

const FontSizeSwitcher = styled.TouchableOpacity``;
const NextArticleWrapper = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;
const NextArticleTitle = styled.Text`
  color: #fff;
  font-size: 13px;
`;

const mapStateToProps = (state, props) => {
  return {
    article: getArticleById(state, props),
    magazine_release: getMagazineReleaseById(state, props),
    article_loading: state.article.article_loading,
    nextArticle: getMagazineReleaseNextArticle(state, props),
    prevArticle: getMagazineReleasePrevArticle(state, props),
  };
};

const madDispatchToProps = (dispatch) => {
  return {
    fetchArticleById: (article_id, isMagazineArticle) =>
      dispatch(fetchArticleById(article_id, isMagazineArticle)),
    readArticle: (article_id) => dispatch(readArticle(article_id)),
  };
};

export default connect(mapStateToProps, madDispatchToProps)(ArticleScreen);
