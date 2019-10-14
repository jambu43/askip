import React from "react";
import styled from "styled-components";
import { TouchableOpacity } from "react-native";

export default class LoginScreen extends React.Component {
  render() {
    const { navigation } = this.props;
    return (
      <Container>
        <Image
          resizeMode="contain"
          source={require("../assets/login_simple_touch.jpg")}
        />
        <Title>Sign up with a simple touch</Title>
        <Text>
          magnam dolores maxime at voluptates nihil iste hic fflibero architecto
          vitae quod veniam? Repellendus! magnam dolores maxime.
        </Text>

        <TouchableOpacity onPress={() => navigation.navigate("HomeStack")}>
          <ButtonGmail>
            <ButtonIcon source={require("../assets/google.png")}></ButtonIcon>
            <ButtonGmailText>CONTINUER AVEC GMAIL</ButtonGmailText>
          </ButtonGmail>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("HomeStack")}>
          <ButtonFacebook>
            <ButtonIcon source={require("../assets/facebook.png")}></ButtonIcon>
            <ButtonFacebookText>CONTINUER AVEC FACEBOOK</ButtonFacebookText>
          </ButtonFacebook>
        </TouchableOpacity>
      </Container>
    );
  }
}

const Container = styled.View`
  padding: 25px;
  justify-content: center;
  flex: 1;
`;
const Image = styled.Image`
  height: 200px;
  width: 100%;
`;

const Title = styled.Text`
  font-size: 30px;
  font-weight: bold;
  line-height: 32px;
  color: #222;
  margin-bottom: 15px;
`;

const Text = styled.Text`
  color: #222;
  margin-bottom: 15px;
`;

const ButtonGmail = styled.View`
  width: 100%;
  border-radius: 2px;
  padding: 15px;
  background: #e7ecf8;
  margin-bottom: 15px;
  flex-direction: row;
  justify-content: center;
`;
const ButtonIcon = styled.Image`
  height: 16px;
  width: 16px;
  align-self: flex-start;
  position: absolute;
  left: 15px;
  top: 15px;
`;
const ButtonGmailText = styled.Text`
  font-size: 13px;
  text-transform: uppercase;
  color: #222;
  text-align: center;
  font-weight: bold;
`;
const ButtonFacebook = styled.View`
  width: 100%;
  border-radius: 2px;
  padding: 15px;
  background: #3d589f;
  margin-bottom: 15px;
  flex-direction: row;
  justify-content: center;
`;

const ButtonFacebookText = styled.Text`
  font-size: 13px;
  text-transform: uppercase;
  color: #fff;
  text-align: center;
  font-weight: bold;
`;
