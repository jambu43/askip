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
      </Container>
    );
  }
}

export default ArtistScreen;

const Container = styled.View`
  justify-content: center;
`;

const Background = styled.View`
  height: 200px;
  background-color: #bfcfc5;
`;
const Center = styled.View`
  align-items: center;
  padding-top: 10px;
`;

const Profile = styled.Image`
  background-color: #bfcfc5;
  height: 150px;
  width: 150px;
  border-radius: 75px;
  border: 3px solid #fff;
`;

const Name = styled.Text`
  padding-top: 15px;
  font-weight: 500;
  font-size: 20px;
`;

const Button = styled.View`
  background-color: #007fea;
  height: 40px;
  width: 150px;
  border: 1px solid #007fea;
  border-radius: 2px;
  margin-top: 10px;
  flex-direction: row;
`;

const Textbutton = styled.Text`
  width: 100%;
  color: #fff;
  text-align: center;
  padding-top: 10px;
`;
const TopTitre = styled.View`
  margin-top: 30px;
  margin-left: 20px;
`;

const Maintitle = styled.Text`
  font-weight: 400;
  font-size: 25px;
  color: black;
`;
const List = styled.View`
  flex-direction: row;
  margin-top: 15px;
`;

const Number = styled.Text`
  color: #e0e0e0;
  font-size: 20px;
`;

const Title = styled.Text`
  color: #b0b0b2;
  font-size: 20px;
  padding-left: 10px;
`;

const Iconbar = styled.View`
  margin: 25px;
  justify-content: space-between;
  flex-direction: row;
`;
const Righticon = styled.View`
  flex-direction: row;
`;
const Lefticon = styled.View``;

const Heart = styled.View`
  margin-right: 20px;
`;

const Share = styled.View``;
