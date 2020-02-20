import React from 'react';
import styled from 'styled-components';
import AppHeader from '../components/generic/AppHeader';
import { dark } from '../config/variables';

export default class Profile extends React.Component {
	render() {
		return (
			<Container>
				<AppHeader />
				<Card>
					<Count>
						<Avatar source={{ uri: user.avatar }} />
						<Username>{{ uri: user.username }}</Username>
					</Count>
					<Informations>
						<Publication>
							<Number>19</Number>
							<Title>Publications</Title>
						</Publication>
						<Publication>
							<Number>390</Number>
							<Title>Abonnés</Title>
						</Publication>
						<Publication>
							<Number>239</Number>
							<Title>Abonnements</Title>
						</Publication>
					</Informations>
				</Card>
				<Btnupdate>
					<Btntext>Modifier</Btntext>
				</Btnupdate>
			</Container>
		);
	}
}

const Container = styled.View`
	flex: 1;
	background-color: ${dark};
`;

const Card = styled.View`
	margin: 10px 10px;
	flex-direction: row;
`;
const Count = styled.View``;

const Username = styled.Text`
	color: #fff;
	text-align: center;
	margin-top: 10px;
	font-size: 15px;
	width: 100px;
`;

const Avatar = styled.Image`
	height: 100px;
	width: 100px;
	border-radius: 50px;
`;

const Informations = styled.View`
	margin-top: 32px;
	flex-direction: row;
`;

const Publication = styled.View`margin-left: 20px;`;

const Number = styled.Text`
	font-size: 16px;
	font-weight: 600;
	text-align: center;
	color: #ffffff;
`;

const Title = styled.Text`
	font-size: 15px;
	color: #ffffff;
`;

const Btnupdate = styled.TouchableOpacity`
	background-color: #ffffff;
	height: 30px;
	margin: 0 20px 20px 10px;
	border: none;
	border-radius: 4px;
	align-content: center;
	align-items: center;
	margin-top: 5px;
`;

const Btntext = styled.Text`
	font-size: 15px;
	color: #000;
	padding-top: 5px;
`;
