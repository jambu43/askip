import React from "react";
import styled from "styled-components";
import { ActivityIndicator } from "react-native";

const PlayButton = ({ is_playing, size, onPress }) => {
  let icon = is_playing
    ? require("../../assets/podcast/pause-button.png")
    : require("../../assets/podcast/play-button.png");
  return (
    <ButtonWrapper size={size} onPress={onPress}>
      <ButtonIcon size={size} source={icon}></ButtonIcon>
    </ButtonWrapper>
  );
};

const ButtonWrapper = styled.TouchableOpacity`
  height: ${props => props.size}px;
  width: ${props => props.size}px;
  border-radius: ${props => props.size / 2}px;
  margin: 0 10px;
`;
const ButtonIcon = styled.Image`
  height: ${props => props.size}px;
  width: ${props => props.size}px;
`;

export default PlayButton;
