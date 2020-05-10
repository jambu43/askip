import React from "react";
import styled from "styled-components";
import { darkLighten } from "../../config/variables";
import { simplePlural, assetsUrl } from "../../helpers";

export default ({ user, navigation }) => {
  return (
    <Wrapper onPress={() => navigation.navigate("Profile", { user_id: user.id })}>
      <Avatar source={{ uri: assetsUrl(user.avatar) }} />
      <Content>
        <Title>{user.name}</Title>
        <FollowersCount>
          {user.followers_count} {simplePlural(user.followers_count, "followers", "follower")}
        </FollowersCount>
      </Content>
    </Wrapper>
  );
};

const Wrapper = styled.TouchableOpacity`
  flex-direction: row;
  margin-bottom: 5px;
`;

const Content = styled.View`
  width: 100%;
  padding: 0px 10px;
`;
const Title = styled.Text`
  color: #fff;
  font-weight: bold;
  font-size: 16px;
`;

const FollowersCount = styled.Text`
  color: #ccc;
`;
const Avatar = styled.Image`
  border-radius: 40px;
  height: 50px;
  width: 50px;
  margin-bottom: 5px;
  border-width: 4px;
  border-color: #aaa;
  background-color: #fff;
`;
