import React from "react";
import HTML from "react-native-render-html";
import { connect } from "react-redux";
import styled from "styled-components";
import { dark, darkLighten } from "../config/variables";
import {
  getArticleById,
  getMagazineReleaseById,
  getMagazineReleaseNextArticle,
} from "../store/selectors/magazine";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import { assetsUrl, cutText } from "../helpers";
import { fetchArticleById } from "../store/actions/articles";

class ArticleScreen extends React.Component {
  componentDidMount() {
    let article_id = this.props.navigation.getParam("article_id");
    this.props.fetchArticleById(article_id);
  }
  render() {
    const { navigation, article, article_loading, nextArticle } = this.props;
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
            {!isArticleLoading ? (
              <MetaWrapper>
                <MetaItem>{Math.ceil(article.read_time / 60)}minute(s)</MetaItem>
              </MetaWrapper>
            ) : null}
          </ArticleContentWrapper>
          <ArticleFeaturedImageWrapper>
            <ArticleFeaturedImage
              source={{ uri: assetsUrl(article.featured_image) }}
            ></ArticleFeaturedImage>
          </ArticleFeaturedImageWrapper>
          <ArticleContentWrapper>
            <Description>{article.preview}</Description>
            {!isArticleLoading ? (
              <HTML html={article.content} tagsStyles={{ p: { color: "#fff" } }}></HTML>
            ) : null}
          </ArticleContentWrapper>
        </Content>
        <StickyBottomMenu>
          <FontSizeSwitcher>
            <MaterialIcons name="format-size" size={24} color="#fff" />
          </FontSizeSwitcher>
          {nextArticle ? (
            <NextArticleWrapper>
              <NextArticleTitle>{cutText(nextArticle.title, 25)}</NextArticleTitle>
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

const StickyBottomMenu = styled.TouchableOpacity`
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

const FontSizeSwitcher = styled.TouchableOpacity``;
const NextArticleWrapper = styled.TouchableOpacity``;
const NextArticleTitle = styled.Text``;

const madDispatchToProps = dispatch => {
  return {
    fetchArticleById: article_id => dispatch(fetchArticleById(article_id)),
  };
};
const mapStateToProps = (state, props) => {
  return {
    article: getArticleById(state, props),
    magazine_release: getMagazineReleaseById(state, props),
    article_loading: state.article.article_loading,
    nextArticle: getMagazineReleaseNextArticle(state, props),
  };
};
export default connect(mapStateToProps, madDispatchToProps)(ArticleScreen);
