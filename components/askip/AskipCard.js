import React from 'react';
import styled from 'styled-components';

export default class AskipCard extends React.Component {
	render() {
		return (
			<Container>
				<AskpImage source={require('../../assets/mhd-en-prison.jpg')} />
				<Group>
					<AskipLike>
						<IconeGroup>
							<Icone source={require('../../assets/like-icone.png')} />
							<Title>Vrai</Title>
						</IconeGroup>
						<IconeGroup>
							<Icone source={require('../../assets/unlinke-icone.png')} />
							<Title>Faux</Title>
						</IconeGroup>

						<IconeGroup>
							<ShareTime>Il y a 18 minutes</ShareTime>
							<Icone source={require('../../assets/share-icone.png')} />
						</IconeGroup>
						<AskipDescripton>
							Alors que MHD est incarcéré depuis janvier 2019 dans une affaire de rixe ayant causé la mort
							d’un jeune homme, sa sœur a annoncé sa
						</AskipDescripton>
					</AskipLike>
				</Group>
			</Container>
		);
	}
}

const Container = styled.View``;
const AskpImage = styled.Image`
	height: 250px;
	background-color: #ffffff;
	width: 100%;
`;
const Group = styled.View`justify-content: space-between;`;
const AskipLike = styled.View`
	flex-direction: row;
	flex-wrap: wrap;
`;
const IconeGroup = styled.TouchableOpacity`
	margin: 20px 10px;
	flex-direction: row;
	flex-wrap: wrap;
`;
const Icone = styled.Image`
	height: 27px;
	width: 27px;
	margin-right: 10px;
`;
const Title = styled.Text`color: #ffffff;`;
const ShareTime = styled.Text`color: #ffffff;`;
const AskipDescripton = styled.Text`
	color: #ffffff;
	font-size: 13px;
	margin-right: 10px;
	margin-left: 10px;
	text-align: justify;
`;
const NumberLike = styled.Text`
	color: #ffffff;
	margin-top: 5px;
`;
