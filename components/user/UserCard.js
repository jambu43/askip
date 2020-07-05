import React from "react";
import styled from "styled-components";
import { darkLighten } from "../../config/variables";
import { simplePlural, assetsUrl, cutText } from "../../helpers";
import CertifiedIcon from "../generic/CertifiedIcon";
import UserAvatar from "../generic/UserAvatar";

export default ({ user, navigation }) => {
  return (
    <Wrapper onPress={() => navigation.navigate("Profile", { user_id: user.id })}>
      <Container>
        <UserAvatar user={user} size={80} />
        <ChannelCardDivider>
          <Title>{cutText(user.name, 13, "...")}</Title>
          {parseInt(user.is_certified) ? <CertifiedIcon /> : null}
        </ChannelCardDivider>
        <FollowersCount>
          {user.followers_count} {simplePlural(user.followers_count, "followers", "follower")}
        </FollowersCount>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.TouchableOpacity`
  width: 50%;
  justify-content: center;
  padding: 15px 10px;
`;

const ChannelCardDivider = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Container = styled.View`
  background: ${darkLighten};
  width: 100%;
  align-items: center;
  min-height: 180px;
  padding: 25px 0px;
  border-radius: 5px;
`;
const Title = styled.Text`
  text-align: center;
  color: #fff;
  font-weight: bold;
  margin-right: 5px;
`;

const FollowersCount = styled.Text`
  text-align: center;
  color: #ccc;
`;
const Avatar = styled.Image`
  border-radius: 80px;
  height: 80px;
  width: 80px;
  margin-bottom: 5px;
  border-width: 4px;
  border-color: #aaa;
  background-color: #fff;
`;
