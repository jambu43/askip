import React from "react";
import styled from "styled-components";
import { dark } from "../config/variables";
import { connect } from "react-redux";

class CommentFeedScreen extends React.Component {
  render() {
    return <Container></Container>;
  }
}

const Container = styled.KeyboardAvoidingView`
  flex: 1;
  background-color: ${dark};
  padding: 10px 0px 0px;
  position: relative;
  flex-grow: 1;
`;

const mapStateToProps = (state, props) => {
  return {};
};

export default connect(mapStateToProps)(CommentFeedScreen);
