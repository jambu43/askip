import React from "react";
import styled from "styled-components";

const GenderCard = ({ gender, background, color }) => (
  <Container background={background}>
    <Title color={color}>{gender.name}</Title>
  </Container>
);

export default GenderCard;

const Container = styled.View`
  padding: 25px;
  background-color: ${props =>
    props.background ? props.background : "#f1f1f1"};
  border-radius: 5px;
  margin-right: 15px;
`;
const Title = styled.Text`
  color: ${props => (props.color ? props.color : "#23232a")};
  text-align: center;
  font-size: 17px;
`;
