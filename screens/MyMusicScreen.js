import React from "react";
import styled from "styled-components";
import AppHeader from "../components/generic/AppHeader";

export default class MyMusicScreen extends React.Component {
  render() {
    return (
      <Container>
        <AppHeader />
      </Container>
    );
  }
}

const Container = styled.View``;
