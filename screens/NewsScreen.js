import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { dark } from "../config/variables";

class NewsScreen extends React.Component {
  render() {
    return (
      <Container>
        <Content></Content>
      </Container>
    );
  }
}

const Container = styled.View`
  flex: 1;
  background-color: ${dark};
  position: relative;
  margin-top: 24px;
`;
const Content = styled.View``;

const mapStateToProps = state => {
  return {};
};

export default connect(mapStateToProps)(NewsScreen);
