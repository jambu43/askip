import React from "react";
import styled from "styled-components";
import { TouchableOpacity } from "react-native";
import { PremiumIcon } from "../Icons";

const PremiumCallToAction = props => (
  <Container>
    <PremiumIcon fill="#fff" />
    <Wrapper>
      <Text>Essayez gratuitement WeeFan premium pendant 12 jours.</Text>
      <TouchableOpacity>
        <ButtonWrapper>Essayez gratuitement</ButtonWrapper>
      </TouchableOpacity>
    </Wrapper>
  </Container>
);

const Container = styled.View`
  background-color: #f3044c;
  padding: 15px;
  margin: 25px 0;
  flex-direction: row;
  align-items: center;
`;

const Wrapper = styled.View`
  width: 75%;
  margin-left: 15px;
`;
const Text = styled.Text`
  font-size: 17px;
  color: white;
  margin-bottom: 5px;
`;

const ButtonWrapper = styled.Text`
  border-radius: 18px;
  font-size: 10px;
  font-weight: bold;
  text-transform: uppercase;
  background-color: white;
  padding: 5px 10px;
  flex-wrap: wrap;
  width: auto;
  text-align: center;
  align-self: flex-start;
`;

export default PremiumCallToAction;
