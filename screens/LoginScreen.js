import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import * as Facebook from "expo-facebook";
import { registerUser, toggleIsLoggingIn } from "../store/actions/auth";
import { NavigationActions, StackActions } from "react-navigation";
import { ActivityIndicator } from "react-native";
import { danger } from "../config/variables";

class LoginScreen extends React.Component {
  async handleLoginClick() {
    try {
      this.props.toggleIsLoggingIn();
      Facebook.initializeAsync("458865114989418");
      const {
        type,
        token,
        expires,
        permissions,
        declinedPermissions,
      } = await Facebook.logInWithReadPermissionsAsync("458865114989418", {
        permissions: ["public_profile", "email"],
      });
      if (type === "success") {
        const response = await fetch(
          `https://graph.facebook.com/me?access_token=${token}&fields=first_name,last_name,email,picture.type(large)`
        );
        const user = await response.json();
        this.props
          .registerUser({
            avatar: user.picture.data.url,
            name: `${user.first_name} ${user.last_name}`,
            email: user.email,
            social_auth_provider: "facebook",
            social_auth_id: user.id,
          })
          .then(() => {
            this.goToHomeScreen();
          });
      } else {
        this.props.toggleIsLoggingIn();
      }
    } catch ({ message }) {
      this.props.toggleIsLoggingIn();
    }
  }

  goToHomeScreen() {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: "HomeStack" })],
    });
    this.props.navigation.dispatch(resetAction);
  }
  render() {
    const { navigation, isLoggingIn } = this.props;
    return (
      <Container>
        <Image resizeMode="contain" source={require("../assets/login_simple_touch.jpg")} />
        <Title>Rejoignez-nous avec un simple clique</Title>
        <Text>
          Rejoignez la conversation en donnant votre avis sur les actualités et les rumeurs et
          accedez à des centaines de magazines et journaux.
        </Text>

        <ButtonGmail disabled={isLoggingIn} onPress={() => navigation.navigate("HomeStack")}>
          <ButtonIcon source={require("../assets/google.png")}></ButtonIcon>
          <ButtonGmailText>CONTINUER AVEC GMAIL</ButtonGmailText>
        </ButtonGmail>

        <ButtonFacebook disabled={isLoggingIn} onPress={this.handleLoginClick.bind(this)}>
          <ButtonIcon source={require("../assets/facebook.png")}></ButtonIcon>
          <ButtonFacebookText>CONTINUER AVEC FACEBOOK</ButtonFacebookText>
        </ButtonFacebook>
        {isLoggingIn ? (
          <LoadingMessage>
            <ActivityIndicator color={danger} />
            <LoadingMessageText>Authentification en cours...</LoadingMessageText>
          </LoadingMessage>
        ) : null}
      </Container>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    registerUser: payload => dispatch(registerUser(payload)),
    toggleIsLoggingIn: () => dispatch(toggleIsLoggingIn()),
  };
};
const mapStateToProps = state => {
  return {
    isLoggingIn: state.auth.isLoggingIn,
    isLoggedIn: state.auth.isLoggedIn,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);

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

const LoadingMessage = styled.View`
  flex-direction: row;
  justify-content: center;
  color: #222;
`;
const LoadingMessageText = styled.Text``;
const ButtonGmail = styled.TouchableOpacity`
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
const ButtonFacebook = styled.TouchableOpacity`
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
