import React from 'react';
import styled from 'styled-components';
import AppHeader from '../generic/AppHeader';


export default class Creact extends React.Component {
	render() {
		return (
			<Container>
				<AppHeader />
				<Content>
					<Avatar />
					<TextEditor />
				</Content>
			</Container>
		);
	}
}

const Container = styled.View``;
const Content = styled.View``;
const Avatar = styled.Image``;
const TextEditor = styled.Input``;
