import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";

const UserAvatar = ({ user }) => {
  return <Avatar source={{ uri: user.avatar }} />;
};
const Avatar = styled.Image`
  height: 24px;
  width: 24px;
  border-radius: 17px;
`;

const mapStateToProps = state => {
  return {
    user: state.auth.user,
  };
};

export default connect(mapStateToProps)(UserAvatar);
