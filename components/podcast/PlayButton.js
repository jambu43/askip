import React from "react";
import styled from "styled-components";
import { ActivityIndicator } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { dark } from "../../config/variables";

const PlayButton = ({ is_playing, is_loading, size, onPress }) => {
  let Icon = is_playing ? (
    <Entypo name="controller-paus" size={size / 1.5} color={dark} />
  ) : (
    <Entypo name="controller-play" size={size / 1.5} color={dark} />
  );
  return (
    <ButtonWrapper disabled={is_loading} size={size} onPress={onPress}>
      {is_loading ? <ActivityIndicator color={dark} size={size / 2} /> : Icon}
    </ButtonWrapper>
  );
};

const ButtonWrapper = styled.TouchableOpacity`
  height: ${(props) => props.size}px;
  width: ${(props) => props.size}px;
  border-radius: ${(props) => props.size / 2}px;
  margin: 0 10px;
  background-color: #fff;
  justify-content: center;
  align-items: center;
`;
const ButtonIcon = styled.Image`
  height: ${(props) => props.size}px;
  width: ${(props) => props.size}px;
`;

export default PlayButton;
