import React from 'react';
import styled from 'styled-components';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import { cutText, assetsUrl } from '../../helpers';
import moment from 'moment';

const UserMagazine = ({ magazine, navigation }) => {
	return (
		<Container>
			<Content onPress={() => navigation.navigate('MagazineRecentlyRead', { magazine_id: magazine.id })}>
				<MagazineCover source={{ uri: assetsUrl(magazine.cover_image) }} />
				<InformationMagazine>
					<MagazineTitle>{cutText(magazine.title, 50)}</MagazineTitle>
					<MagazineReleaseEdition>
						{moment(magazine.publication_date).format('MMMM YYYY')}
					</MagazineReleaseEdition>
					<MagazineReleaseName>{magazine.magazine.name} fans</MagazineReleaseName>
					<ProgressWrapper>
						<MagazineProgressBar />
					</ProgressWrapper>
				</InformationMagazine>
			</Content>
		</Container>
	);
};

export default UserMagazine;

const Container = styled.View``;
const Content = styled.TouchableOpacity`
	flex-direction: row;
	margin: 10px;
`;
const MagazineCover = styled.Image`
	background-color: #ffffff;
	height: 100px;
	width: 75px;
	border-radius: 5px;
`;
const InformationMagazine = styled.View`
	margin-left: 10px;
	width: 150px;
	height: 100px;
`;
const MagazineTitle = styled.Text`
	color: #fff;
	font-weight: bold;
	font-size: 14px;
	margin-bottom: 5px;
`;
const MagazineReleaseEdition = styled.Text`
	color: #92929d;
	font-size: 12px;
	margin-bottom: 5px;
`;
const MagazineReleaseName = styled.Text`
	color: #fff;
	font-size: 11px;
	font-weight: bold;
	margin-bottom: 5px;
`;

const ProgressWrapper = styled.View`
	border-radius: 5px;
	height: 7px;
	background: #fff;
	margin: 10px 0px;
	position: relative;
`;

const MagazineProgressBar = styled.View`
	border-radius: 5px;
	background: red;
	height: 7px;
	width: 100px;
	left: 0px;
	top: 0px;
	bottom: 0px;
	right: 0px;
	z-index: 2;
`;

const Separator = styled.View`
	margin-left: 10px;
	background-color: #92929d;
	width: 300px;
	height: 1px;
`;
