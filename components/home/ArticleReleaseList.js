import React from 'react';
import styled from 'styled-components';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import ArticleReleaseCard from '../article/ArticleReleaseCard';

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
				</ScrollView>
			</Content>
		</Container>
	);
};

export default ArticleReleaseList;

const Container = styled.View`padding: 0 15px;`;
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
