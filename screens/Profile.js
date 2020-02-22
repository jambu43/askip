import React from 'react';
import styled from 'styled-components';
import AppHeader from '../components/generic/AppHeader';
import { dark } from '../config/variables';
import UserMagazine from '../components/home/UserMagazine';
import { ScrollView } from 'react-native-gesture-handler';

export default class MyMusicScreen extends React.Component {
	render() {
		return (
			<Container>
				<AppHeader />
				<ScrollView>
					<Card>
						<Count>
							<Avatar source={require('../assets/avatar.jpg')} />
							<Username>Junior Ngangeli</Username>
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
					<MagazineRecentlyRead>Magazine rerécemment</MagazineRecentlyRead>
					<ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
						<UserMagazine />
					</ScrollView>
				</ScrollView>
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
	height: 90px;
	width: 90px;
	border-radius: 50px;
`;

const Informations = styled.View`
	margin-top: 32px;
	flex-direction: row;
`;

const Publication = styled.View`margin-left: 10px;`;

const Number = styled.Text`
	font-size: 15px;
	font-weight: 600;
	text-align: center;
	color: #ffffff;
`;

const Title = styled.Text`
	font-size: 13px;
	color: #ffffff;
	padding-left: 3px;
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

const Content = styled.View`
	flex-direction: row;
	margin: 10px;
`;
const CoverMagazine = styled.Image`
	background-color: #ffffff;
	height: 100px;
	width: 80px;
	border-radius: 5px;
`;
const InformationMagazine = styled.View`
	margin-left: 10px;
	width: 250px;
`;
const TitleMagazine = styled.Text`
	color: #fff;
	font-weight: bold;
	font-size: 14px;
	margin-bottom: 5px;
`;
const DescriptionMagazine = styled.Text`
	color: #ffffff;
	text-align: justify;
`;
const MagazineRecentlyRead = styled.Text`
	font-size: 15px;
	font-weight: bold;
	margin-bottom: 10px;
	color: #fff;
	text-transform: uppercase;
	margin-left: 10px;
`;
