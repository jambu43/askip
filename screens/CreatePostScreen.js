import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { dark } from "../config/variables";
import AppHeader from "../components/generic/AppHeader";
import UserAvatar from "../components/generic/UserAvatar";
import { Feather } from "@expo/vector-icons";

export default class CreatePostScreen extends React.Component {
  state = {
    post: {},
    colors: ["#70595F", "#333228", "#445257", "#5E6C70"],
    selectedColor: null,
  };

  handleColorSelected(color) {
    this.setState({
      selectedColor: color,
    });
  }

  render() {
    const { colors, selectedColor } = this.state;
    return (
      <Container>
        <AppHeader />
        <PostFormHeader>
          <UserAvatar />
          <PostInputWrapper colorMode={!!selectedColor} bgColor={selectedColor}>
            <PostInput
              colorMode={!!selectedColor}
              multiline={true}
              autofocus={true}
              placeholder="Quoi de neuf ?"
            />
          </PostInputWrapper>
        </PostFormHeader>
        <ColorPickerWrapper>
          <ImagePicker>
            <Feather name="image" size={30} color="#fff" />
          </ImagePicker>
          {colors.map(item => {
            return (
              <ColorPickerItem onPress={() => this.handleColorSelected(item)} bgColor={item} />
            );
          })}
        </ColorPickerWrapper>
      </Container>
    );
  }
}

const Container = styled.View`
  flex: 1;
  background-color: ${dark};
`;
const PostFormHeader = styled.View`
  flex-direction: row;
  padding: 15px;
`;
const PostInputWrapper = styled.View`
  background: ${props => (props.colorMode ? props.bgColor : "transparent")};
  padding: ${props => (props.colorMode ? 15 : 0)}px;
  border-radius: 5px;
  margin-left: 15px;
  flex: 1;
`;
const PostInput = styled.TextInput`
  color: #fff;
  text-align: ${props => (props.colorMode ? "center" : "left")};
  font-size: ${props => (props.colorMode ? 23 : 14)}px;
  font-weight: ${props => (props.colorMode ? "bold" : "normal")};
`;
const ColorPickerWrapper = styled.View`
  flex-direction: row;
  padding: 0 15px;
  justify-content: flex-end;
`;
const ColorPickerItem = styled.TouchableOpacity`
  background: ${props => props.bgColor};
  height: 40px;
  width: 40px;
  border-radius: 5px;
  margin-right: 10px;
`;
const ImagePicker = styled.TouchableOpacity`
  height: 40px;
  width: 40px;
  border-radius: 5px;
  margin-right: 10px;
  justify-content: center;
`;
