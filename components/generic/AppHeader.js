import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { TouchableOpacity, View } from "react-native";
import { BackIcon } from "../Icons";
import { dark } from "../../config/variables";

const AppHeader = ({ showAvatar = true, showBack = false, navigation }) => (
  <Container>
    <Wrapper centerLogo={showAvatar}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        {showBack && <BackIcon fill="#fff" size={24} />}
      </TouchableOpacity>
      {showAvatar && (
        <TouchableOpacity>
          <Logo source={require("../../assets/askip.png")} />
        </TouchableOpacity>
      )}
    </Wrapper>
  </Container>
);

const Container = styled.View`
  padding: 10px 10px;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 24px;
  background: ${dark};
`;

const MenuIcon = styled.Image`
  height: 24px;
  width: 24px;
`;

const Wrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: ${(props) => (props.centerLogo ? "center" : "space-between")};
  flex: 1;
`;
const Logo = styled.Image`
  height: 37.94px;
  width: 85px;
  border-radius: 17px;
`;

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
  };
};

export default connect(mapStateToProps)(AppHeader);
