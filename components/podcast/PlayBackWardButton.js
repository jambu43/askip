import React from "react";
import styled from "styled-components";

const PlayBackWardButton = ({ size, disabled }) => {
  let icon = require("../../assets/podcast/play-backward.png");
  return (
    <ButtonWrapper size={size} disabled={disabled}>
      <ButtonIcon size={size} source={icon}></ButtonIcon>
    </ButtonWrapper>
  );
};

const ButtonWrapper = styled.TouchableOpacity`
  height: ${props => props.size}px;
  width: ${props => props.size}px;
  border-radius: ${props => props.size / 2}px;
`;
const ButtonIcon = styled.Image`
  height: ${props => props.size}px;
  width: ${props => props.size}px;
`;

export default PlayBackWardButton;
