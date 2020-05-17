import React from "react";
import styled from "styled-components";
import { assetsUrl, cutText } from "../../helpers";

export default class ArticleReleaseCard extends React.Component {
  render() {
    const { article, navigation, size } = this.props;
    return (
      <Container
        size={size}
        onPress={() => navigation.navigate("News", { article_id: article.id })}
      >
        <ArticleCover size={size} source={{ uri: assetsUrl(article.featured_image) }} />
        <ArticleTitle>{cutText(article.title, 50)}</ArticleTitle>
        <ArticlePreview>{cutText(article.preview, 80)}</ArticlePreview>
        {article.publication_release ? (
          <ArticleFrom>{article.publication_release.newspaper.name}</ArticleFrom>
        ) : null}
      </Container>
    );
  }
}

const Container = styled.TouchableOpacity`
  width: ${(props) => (props.size == "lg" ? "100%" : "200px")};
  margin-right: 15px;
  height: auto;
`;

const ArticleCover = styled.Image`
  width: ${(props) => (props.size == "lg" ? "100%" : "200px")};
  height: ${(props) => (props.size == "lg" ? "200px" : "108px")};
  border-radius: 5px;
  margin-bottom: 5px;
  background-color: #fff;
`;

const ArticleTitle = styled.Text`
  color: #fff;
  font-weight: bold;
  font-size: 14px;
  margin-bottom: 5px;
`;

const ArticlePreview = styled.Text`
  color: #fff;
  font-size: 11px;
  font-weight: bold;
  margin-bottom: 5px;
`;

const ArticleFrom = styled.Text`
  color: #92929d;
  font-size: 12px;
  margin-bottom: 10px;
`;
