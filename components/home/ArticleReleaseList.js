import React from "react";
import styled from "styled-components";
import { TouchableOpacity, ScrollView } from "react-native-gesture-handler";
import ArticleReleaseCard from "../article/ArticleReleaseCard";
import { darkLighten } from "../../config/variables";

const ArticleReleaseList = ({ show_more, onClick, title, articles, navigation }) => {
  return (
    <Container>
      <Header>
        <TouchableOpacity disabled={!show_more} onPress={onClick}>
          <Title>{title}</Title>
        </TouchableOpacity>
      </Header>
      <Content>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {articles.map((article) => (
            <ArticleReleaseCard navigation={navigation} article={article} key={article.id} />
          ))}
          <ExploreArticles
            onPress={() => {
              navigation.navigate("NewsExplorer");
            }}
          >
            <ExploreArticlesText>Explorer les articles</ExploreArticlesText>
          </ExploreArticles>
        </ScrollView>
      </Content>
    </Container>
  );
};

export default ArticleReleaseList;

const Container = styled.View`
  padding: 0 15px;
`;
const Title = styled.Text`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
  margin-top: 10px;
  color: #fff;
  text-transform: uppercase;
`;
const Content = styled.View``;
const Header = styled.View``;

const ExploreArticles = styled.TouchableOpacity`
  width: 200px;
  height: 120px;
  background: ${darkLighten};
  border-radius: 5px;
  justify-content: center;
`;

const ExploreArticlesText = styled.Text`
  color: #fff;
  text-transform: uppercase;
  text-align: center;
  font-size: 12px;
`;
