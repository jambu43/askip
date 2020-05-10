import React from "react";
import styled from "styled-components";
import { darkLighten } from "../../config/variables";
import { simplePlural, assetsUrl } from "../../helpers";

export default ({ user, navigation }) => {
  return (
    <Wrapper onPress={() => navigation.navigate("Profile", { user_id: user.id })}>
      <Container>
        <Avatar source={{ uri: assetsUrl(user.avatar) }} />
        <Title>{user.name}</Title>
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
