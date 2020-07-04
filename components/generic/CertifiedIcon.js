import React from "react";
import styled from "styled-components";

export default () => {
  return <CertifiedIcon source={require("../../assets/verified.png")} />;
};

const CertifiedIcon = styled.Image`
  height: 13px;
  width: 13px;
`;
