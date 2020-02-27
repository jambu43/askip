import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { dark } from "../config/variables";
import AppHeader from "../components/generic/AppHeader";
import UserAvatar from "../components/generic/UserAvatar";

export default class CreatePostScreen extends React.Component {
  render() {
    return (
      <Container>
        <AppHeader />
        <PostInputWrapper>
          <UserAvatar />
          <PostInput autofocus={true} placeholder="Quoi de neuf ?" />
        </PostInputWrapper>
      </Container>
    );
  }
}

const Container = styled.View`
  flex: 1;
  background-color: ${dark};
`;

const PostInputWrapper = styled.View`
  flex-direction: row;
  padding: 15px;
`;
const PostInput = styled.TextInput`
  margin-left: 15px;
`;
