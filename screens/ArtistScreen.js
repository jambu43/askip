import React, { Component } from "react";
import styled from "styled-components";
import { SharedIcon, HeartIcon } from "../components/Icons";
import AppHeader from "../components/generic/AppHeader";

class ArtistScreen extends React.Component {
  state = {
    image: require("../assets/drake.jpg"),
    name: "Drake"
  };

  render() {
    return (
      <Container>
        <AppHeader showAvatar={false} showBack={true} />
        <ProfileHeader></ProfileHeader>
      </Container>
    );
  }
}

export default ArtistScreen;

const Container = styled.View`
  justify-content: center;
`;

const ProfileHeader = styled.View``;
const Image = styled.Image``;
const Name = styled.Text``;
const Slug = styled.Text``;
const ProfileHeaderStats = styled.View`
  flex-direction: row;
`;

const StatItem = styled.View``;
const StatItemName = styled.Text``;
const StatItemCount = styled.Text``;
