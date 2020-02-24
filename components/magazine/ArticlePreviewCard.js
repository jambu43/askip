import React from "react";
import styled from "styled-components";
import { assetsUrl, cutText } from "../../helpers";
import { darkLighten } from "../../config/variables";

const ArticlePreviewCard = ({ article, navigation }) => {
  return (
    <Container onPress={() => navigation.navigate("Article", { article_id: article.id })}>
      <ArticleHeader>
        <ArticleHeaderImage source={{ uri: assetsUrl(article.featured_image) }} />
        <ArticleHeaderTitle>{article.title}</ArticleHeaderTitle>
      </ArticleHeader>
      <ArticleContent>
        <ArticleContentText>{cutText(article.preview, 90)}</ArticleContentText>
      </ArticleContent>
    </Container>
  );
};

const Container = styled.TouchableOpacity`
  border-radius: 5px;
  background: ${darkLighten};
  margin-bottom: 10px;
  padding: 10px;
  position: relative;
`;
const ArticleHeader = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 5px;
`;
const ArticleHeaderTitle = styled.Text`
  color: #fff;
  font-weight: bold;
  flex: 1;
  font-size: 14px;
`;
const ArticleHeaderImage = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: 5px;
  margin-right: 10px;
`;
const ArticleContent = styled.View``;
const ArticleContentText = styled.Text`
  color: #c5c5c5;
`;

export default ArticlePreviewCard;
