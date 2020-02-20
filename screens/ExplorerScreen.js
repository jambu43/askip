import React from 'react';
import styled from 'styled-components';
import AppHeader from '../components/generic/AppHeader';
import AskipReleaseList from '../components/home/AskipReleaseList';
import { dark } from '../config/variables';

export default class ExplorerScreen extends React.Component {
	render() {
		return (
			<Container>
				<AppHeader />
				<AskipReleaseList />
			</Container>
		);
	}
}

const Container = styled.View`
	flex: 1;
	background-color: ${dark};
`;
const Text = styled.Text``;
