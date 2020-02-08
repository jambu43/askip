import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { dark } from '../config/variables';

class MagazineScreen extends React.Component {
	render() {
		return <Container />;
	}
}

const Container = styled.View`
	flex: 1;
	background-color: ${dark};
`;

const mapStateToProps = (state) => {
	return state;
};
export default connect(mapStateToProps)(MagazineScreen);
