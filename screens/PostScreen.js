import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";

class PostScreen extends React.Component {
  render() {
    return (
      <Container>
        <Content></Content>
      </Container>
    );
  }
}

const Container = styled.View``;
const Content = styled.View``;

const mapStateToProps = state => {
  return {};
};

export default connect(mapStateToProps)(PostScreen);
