import React from "react";
import styled from "styled-components";
import { assetsUrl, cutText } from "../../helpers";
import CertifiedIcon from "../generic/CertifiedIcon";

export default ({ user, navigation }) => {
  return (
    <Wrapper onPress={() => navigation.navigate("Podcast", { user_id: user.id })}>
      <Container>
        <Avatar source={{ uri: assetsUrl(user.avatar) }} />
        <ChannelCardDivider>
          <Title>{cutText(user.name, 18, "...")}</Title>
          {user.is_certified ? <CertifiedIcon /> : null}
        </ChannelCardDivider>
        <ChannelDescription>{cutText(user.bio, 36, "...")}</ChannelDescription>
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
  width: 100%;
  min-height: 180px;
  border-radius: 5px;
`;

const ChannelCardDivider = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Title = styled.Text`
  color: #fff;
  font-weight: bold;
  margin-right: 5px;
`;

const ChannelDescription = styled.Text`
  color: #ccc;
`;
const Avatar = styled.Image`
  height: 145px;
  width: 100%;
  margin-bottom: 5px;
  border-radius: 3px;
  background-color: #fff;
`;
