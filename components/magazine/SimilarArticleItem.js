import React from "react";
import styled from "styled-components";
import { assetsUrl } from "../../helpers";

const SimilarArticleItem = ({ article, navigation }) => {
  return (
    <Container onPress={() => navigation.push("News", { article_id: article.id })}>
      <ArticleImage source={{ uri: assetsUrl(article.featured_image) }} />
      <Content>
        <ArticleTitle>{article.title}</ArticleTitle>
      </Content>
    </Container>
  );
};

const Container = styled.TouchableOpacity`
  flex-direction: row;
  margin-bottom: 10px;
  align-items: center;
`;
const Content = styled.View`
  justify-content: center;
`;
const ArticleImage = styled.Image`
  width: 70px;
  height: 70px;
  border-radius: 5px;
  margin-right: 10px;
`;
const ArticleTitle = styled.Text`
  color: #fff;
  font-weight: bold;
`;
const ArticleDate = styled.Text``;

export default SimilarArticleItem;
