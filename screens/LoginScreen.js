import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import * as Facebook from "expo-facebook";
import * as Google from "expo-google-app-auth";

import { registerUser, toggleIsLoggingIn } from "../store/actions/auth";
import { NavigationActions, StackActions } from "react-navigation";
import { ActivityIndicator } from "react-native";
import { danger } from "../config/variables";

import { GOOGLE_ANDROID_CLIENT_ID, GOOGLE_IOS_CLIENT_ID, FACEBOOK_APP_ID } from "../config/env";

class LoginScreen extends React.Component {
  async handleGoogleLoginClick() {
    await this.props.toggleIsLoggingIn();
    try {
      const result = await Google.logInAsync({
        androidClientId: GOOGLE_ANDROID_CLIENT_ID,
        iosClientId: GOOGLE_IOS_CLIENT_ID,
        iosStandaloneAppClientId: GOOGLE_IOS_CLIENT_ID,
        androidStandaloneAppClientId: GOOGLE_ANDROID_CLIENT_ID,
        scopes: ["profile", "email"],
      });
      if (result.type === "success") {
        const user = result.user;
        this.props
          .registerUser({
            avatar: user.photoUrl,
            email: user.email,
            name: `${user.givenName} ${user.familyName}`,
            email: user.email,
            social_auth_provider: "google",
            social_auth_id: user.id,
          })
          .then(() => {
            this.goToHomeScreen();
          })
          .catch(() => {
            this.props.toggleIsLoggingIn();
          });
      } else {
        this.props.toggleIsLoggingIn();
      }
    } catch (e) {
      this.props.toggleIsLoggingIn();
    }
  }

  async handleLoginClick() {
    try {
      this.props.toggleIsLoggingIn();
      Facebook.initializeAsync(FACEBOOK_APP_ID);
      const {
        type,
        token,
        expires,
        permissions,
        declinedPermissions,
      } = await Facebook.logInWithReadPermissionsAsync(FACEBOOK_APP_ID, {
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

  componentDidMount() {
    const { isLoggedIn } = this.props;
    if (isLoggedIn) {
      this.goToHomeScreen();
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
        <Title>Rejoignez-nous avec un simple clic</Title>
        <Text>
          Rejoignez la conversation en donnant votre avis sur les actualités et les rumeurs et
          accedez à des centaines de magazines et journaux.
        </Text>

        <ButtonFacebook disabled={isLoggingIn} onPress={this.handleLoginClick.bind(this)}>
          <ButtonIcon source={require("../assets/facebook.png")}></ButtonIcon>
          <ButtonFacebookText>CONTINUER AVEC FACEBOOK</ButtonFacebookText>
        </ButtonFacebook>

        <ButtonPhoneNumber
          disabled={isLoggingIn}
          onPress={() => navigation.navigate("LoginWithPhoneNumber")}
        >
          <ButtonGmailText>CONTINUER AVEC MON NUMERO</ButtonGmailText>
        </ButtonPhoneNumber>

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

const mapDispatchToProps = (dispatch) => {
  return {
    registerUser: (payload) => dispatch(registerUser(payload)),
    toggleIsLoggingIn: () => dispatch(toggleIsLoggingIn()),
  };
};
const mapStateToProps = (state) => {
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
  height: 120px;
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

const ButtonPhoneNumber = styled.TouchableOpacity`
  width: 100%;
  border-radius: 2px;
  padding: 15px;
  background: #fff;
  margin-bottom: 15px;
  flex-direction: row;
  justify-content: center;
`;

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
