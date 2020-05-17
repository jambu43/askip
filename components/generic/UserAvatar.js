import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { danger } from "../../config/variables";

const UserAvatar = ({ user }) => {
  return (
    <AvatarWrapper>
      <Avatar source={{ uri: user.avatar }} />
      {user.notifications_count > 0 ? (
        <NotificationBadge isBadge={true}>{user.notifications_count}</NotificationBadge>
      ) : null}
    </AvatarWrapper>
  );
};
const AvatarWrapper = styled.View`
  position: relative;
`;
const Avatar = styled.Image`
  height: 24px;
  width: 24px;
  border-radius: 17px;
`;

const NotificationBadge = styled.Text`
  color: #fff;
  background-color: ${(props) => (props.isBadge ? danger : "transparent")};
  border-radius: 16px;
  width: 14px;
  height: 14px;
  line-height: 14px;
  font-size: 12px;
  text-align: center;
  position: absolute;
  bottom: -5px;
  right: -5px;
`;

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
  };
};

export default connect(mapStateToProps)(UserAvatar);
