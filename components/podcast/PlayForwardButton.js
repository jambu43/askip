import React from "react";
import styled from "styled-components";

const PlayForwardButton = ({ size, disabled, onPress }) => {
  let icon = require("../../assets/podcast/play-forward.png");
  return (
    <ButtonWrapper size={size} disabled={disabled} onPress={onPress}>
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

export default PlayForwardButton;
