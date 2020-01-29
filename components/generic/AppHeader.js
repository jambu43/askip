import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { TouchableOpacity, View } from "react-native";
import { BackIcon } from "../Icons";

const AppHeader = ({ showAvatar = true, showBack = false, user }) => (
  <Container>
    <Wrapper>
      {showBack && <BackIcon size={24} />}
      {showAvatar && (
        <TouchableOpacity>
          <Avatar source={{ uri: user.avatar }} />
        </TouchableOpacity>
      )}
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
  border-bottom-color: #f5f5f5;
  border-bottom-width: 1px;
`;

const MenuIcon = styled.Image`
  height: 24px;
  width: 24px;
`;

const Wrapper = styled.View`
  flex-direction: row;
  align-items: center;
  flex: 1;
`;
const Avatar = styled.Image`
  height: 34px;
  width: 34px;
  border-radius: 17px;
  margin-right: 10px;
`;

const mapStateToProps = state => {
  return {
    user: state.auth.user,
  };
};

export default connect(mapStateToProps)(AppHeader);
