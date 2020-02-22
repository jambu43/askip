import React from 'react';
import styled from 'styled-components';

export default class AskipText extends React.Component {
	render() {
		return (
			<Container>
				<AskipCoverColor>
					<AskipTextPublished>
						Libala nangai eza lobi mes je ne sais pas nako loba ni-ni stp bo aide ngai
					</AskipTextPublished>
				</AskipCoverColor>
			</Container>
		);
	}
}

const Container = styled.View``;
const AskipCoverColor = styled.View`
	height: 250px;
	margin-top: 10px;
	background-color: red;
	justify-content: center;
	padding: 10px;
`;
const AskipTextPublished = styled.Text`
	font-weight: 600;
	color: #ffffff;
	font-size: 20px;
	text-align: center;
`;
