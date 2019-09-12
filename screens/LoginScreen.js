import React from "react";
import styled from "styled-components";
import AppHeader from "../components/generic/AppHeader";

export default class LoginScreen extends React.Component {
  render() {
    return (
      <Container>
        <AppHeader />
      </Container>
    );
  }
}

const Container = styled.View``;
