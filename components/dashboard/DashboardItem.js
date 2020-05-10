import React from "react";
import styled from "styled-components";
import { darkLighten, danger } from "../../config/variables";

export default ({ title, count, isBadge, onPress, even }) => {
  return (
    <Container even={even} onPress={onPress}>
      <Title>{title}</Title>
      {count ? <Counter isBadge={isBadge}>{count}</Counter> : null}
    </Container>
  );
};

const Container = styled.TouchableOpacity`
  flex-direction: row;
  padding: 10px;
  justify-content: space-between;
  background-color: ${(props) => (!props.even ? darkLighten : "transparent")};
`;
const Title = styled.Text`
  color: #fff;
  font-weight: bold;
  font-size: 14px;
`;
const Counter = styled.Text`
  color: #fff;
  background-color: ${(props) => (props.isBadge ? danger : "transparent")};
  border-radius: 16px;
  width: 16px;
  height: 16px;
  line-height: 16px;
  text-align: center;
`;
