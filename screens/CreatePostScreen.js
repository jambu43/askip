import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { dark } from "../config/variables";
import AppHeader from "../components/generic/AppHeader";

export default class CreatePostScreen extends React.Component {
  render() {
    return (
      <Container>
        <AppHeader />
      </Container>
    );
  }
}

const Container = styled.View`
  flex: 1;
  background-color: ${dark};
`;
