import React from 'react';
import styled from 'styled-components';

const PublicationRelease = (props) => (
	<Container>
		<Title>A LA UNE</Title>
		<Card>
			<PublicationImage source={require('../../assets/publication1.png')} />
			<PublicationTitle>La procédure de remise à Madrid de l’indépendantiste catalan</PublicationTitle>
		</Card>
	</Container>
);

const Container = styled.View`
	padding: 0 15px;
	height: 20px;
	margin-top: 10px;
`;
const Title = styled.Text`
	font-size: 20px;
	font-weight: bold;
	margin-bottom: 10px;
	padding-bottom: 20px;
	color: #fff;
	text-transform: uppercase;
`;

const Card = styled.TouchableOpacity`width: 200px;`;

const PublicationImage = styled.Image`
	width: 200px;
	height: 150px;
	border-radius: 5px;
	background: #f1f1f1;
	margin-bottom: 5px;
`;

const PublicationTitle = styled.Text`
	color: #fff;
	font-weight: bold;
	font-size: 14px;
	margin-bottom: 5px;
`;

export default PublicationRelease;
