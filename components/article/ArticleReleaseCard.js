import React from 'react';
import styled from 'styled-components';
import { assetsUrl, cutText } from '../../helpers';

export default class ArticleReleaseCard extends React.Component {
	render() {
		const { article, navigation } = this.props;
		return (
			<Container onPress={() => navigation.navigate('Article', { article_id: article.id })}>
				<ArticleCover source={{ uri: assetsUrl(article.featured_image) }} />
				<ArticleTitle>{cutText(article.title, 50)}</ArticleTitle>
				<ArticlePreview>{cutText(article.preview, 80)}</ArticlePreview>
				<ArticleFrom>{article.publication_release.title}</ArticleFrom>
			</Container>
		);
	}
}

const Container = styled.TouchableOpacity`
	width: 200px;
	margin-right: 15px;
	height: auto;
`;

const ArticleCover = styled.Image`
	width: 200px;
	height: 160px;
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
