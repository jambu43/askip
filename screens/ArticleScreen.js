import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { dark, darkLighten } from "../config/variables";
import { getArticleById, getMagazineReleaseById } from "../store/selectors/magazine";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { assetsUrl, cutText } from "../helpers";

class ArticleScreen extends React.Component {
  render() {
    const { navigation, article } = this.props;
    console.log(article);
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
          </ArticleContentWrapper>
          <ArticleFeaturedImageWrapper>
            <ArticleFeaturedImage
              source={{ uri: assetsUrl(article.featured_image) }}
            ></ArticleFeaturedImage>
          </ArticleFeaturedImageWrapper>
          <ArticleContentWrapper>
            <Description>{article.preview}</Description>
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
  position: absolute;
  background: ${darkLighten};
  top: 0px;
  left: 0px;
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
  margin-top: 60px;
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
    article: getArticleById(state, props),
    magazine_release: getMagazineReleaseById(state, props),
  };
};
export default connect(mapStateToProps)(ArticleScreen);
