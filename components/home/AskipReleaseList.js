import React from 'react';
import styled from 'styled-components';
import AskipCard from '../askip/AskipCard';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import AskipText from '../askip/AskipText';

const AskipReleaseList = ({ show_more, onClick, author, posts, navigation }) => {
	console.log(posts);
	return (
		<Container>
			<Header />
			<Content>
				<ScrollView showsVerticalScrollIndicator={false}>
					{posts.map((post) => (
						<TouchableOpacity>
							<AuthorGroup>
								<AuthorImage />
								<Author>RAPRNB</Author>
							</AuthorGroup>
						</TouchableOpacity>
					))}

					<AskipGroup>
						<AskipCard />
					</AskipGroup>
					<AskipGroup>
						<AskipText />
						<CommentSection>
							<CommentInput
								value=""
								placeholder="Ajouter un commentaire ..."
								placeholderTextColor="#fff"
							/>
						</CommentSection>
					</AskipGroup>
				</ScrollView>
			</Content>
		</Container>
	);
};

export default AskipReleaseList;

const Container = styled.View``;
const Header = styled.View``;
const Content = styled.View``;
const AuthorGroup = styled.View`
	/* display: flex; */
	flex-direction: row;
	margin-left: 10px;
	margin-bottom: 10px;
`;
const AuthorImage = styled.Image`
	background-color: #ffffff;
	border-radius: 20px;
	height: 30px;
	width: 30px;
`;
const Author = styled.Text`
	text-transform: uppercase;
	color: #ffffff;
	font-size: 13px;
	margin-left: 5px;
	margin-top: 8px;
`;
const AskipGroup = styled.View``;

const CommentSection = styled.View`
	margin: 10px;
	flex-direction: row;
	flex-wrap: wrap;
`;
const AuthorComment = styled.Image`
	background-color: #ffffff;
	border-radius: 20px;
	height: 30px;
	width: 30px;
`;
const CommentInput = styled.TextInput`
	border-bottom-width: 1px;
	border-bottom-color: #ffffff;
	line-height: 20px;
	padding: 2.5px 5px;
	margin-bottom: 20px;
	border-radius: 5px;
	width: 100%;
`;
