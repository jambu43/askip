import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";

const AddPostIcon = () => {
  return <PlusIcon source={require("../../assets/plus.png")} />;
};
const PlusIcon = styled.Image`
  height: 24px;
  width: 24px;
  border-radius: 17px;
`;

const mapStateToProps = state => {
  return {};
};

export default connect(mapStateToProps)(AddPostIcon);
