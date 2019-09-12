import React from "react";
import styled from "styled-components";
import { TouchableOpacity, View } from "react-native";
import { NotificationIcon } from "../Icons";

const AppHeader = props => (
  <Container>
    <Wrapper>
      <TouchableOpacity>
        <Avatar source={require("../../assets/avatar.jpg")} />
      </TouchableOpacity>
      <TouchableOpacity>
        <NotificationIcon />
      </TouchableOpacity>
    </Wrapper>
  </Container>
);

const Container = styled.View`
  padding: 10px 20px;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 24px;
`;

const MenuIcon = styled.Image`
  height: 24px;
  width: 24px;
`;

const Wrapper = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  flex: 1;
`;
const Avatar = styled.Image`
  height: 34px;
  width: 34px;
  border-radius: 17px;
  margin-right: 10px;
`;

export default AppHeader;
