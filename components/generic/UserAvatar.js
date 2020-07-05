import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { danger } from "../../config/variables";
import { initials, assetsUrl } from "../../helpers";

const UserAvatar = ({ user, currentUser, size = 24, show_notifications = false }) => {
  let userData = user ? user : currentUser;
  return (
    <AvatarWrapper>
      {userData.avatar ? (
        <Avatar size={size} source={{ uri: assetsUrl(userData.avatar) }} />
      ) : (
        <AvatarTextWrapper size={size}>
          <AvatarText>{initials(userData.name)}</AvatarText>
        </AvatarTextWrapper>
      )}
      {show_notifications && userData.notifications_count > 0 ? (
        <NotificationBadge isBadge={true}>{userData.notifications_count}</NotificationBadge>
      ) : null}
    </AvatarWrapper>
  );
};
const AvatarWrapper = styled.View`
  position: relative;
`;
const Avatar = styled.Image`
  height: ${(props) => `${props.size}px`};
  width: ${(props) => `${props.size}px`};
  border-radius: ${(props) => props.size / 2}px;
  background-color: #fff;
`;

const AvatarTextWrapper = styled.View`
  height: ${(props) => `${props.size}px`};
  width: ${(props) => `${props.size}px`};
  background-color: #fff;
  border-radius: ${(props) => props.size / 2}px;
  justify-content: center;
  border-width: 2px;
  border-color: #aaa;
`;
const AvatarText = styled.Text`
  text-transform: uppercase;
  text-align: center;
  font-size: 12px;
  line-height: 12px;
`;

const NotificationBadge = styled.Text`
  color: #fff;
  background-color: ${(props) => (props.isBadge ? danger : "transparent")};
  border-radius: ${(props) => props.size / 2}px;
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
    currentUser: state.auth.user,
  };
};

export default connect(mapStateToProps)(UserAvatar);
