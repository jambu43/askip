import React from 'react';
import styled from 'styled-components';
import AskipCard from '../askip/AskipCard';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';

const AskipReleaseList = () => {
	return (
		<Container>
			<Header />
			<Content>
				<ScrollView showsVerticalScrollIndicator={false}>
					<TouchableOpacity>
						<AuthorGroup>
							<AuthorImage />
							<Author>RAPRNB</Author>
						</AuthorGroup>
					</TouchableOpacity>
					<AskipCard />
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
