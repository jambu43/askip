import React from "react";
import styled from "styled-components";
import { logInUser, toggleIsLoggingIn } from "../store/actions/auth";
import { connect } from "react-redux";
import { dark, darkLighten, danger } from "../config/variables";
import { TouchableOpacity, ActivityIndicator } from "react-native";
import { BackIcon } from "../components/Icons";
import { StackActions, NavigationActions } from "react-navigation";

class LoginWithPhoneNumberScreen extends React.Component {
  state = {
    phone_number: "",
    password: "",
    showFormGeneralErrors: false
  };

  goToHomeScreen() {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: "HomeStack" })],
    });
    this.props.navigation.dispatch(resetAction);
  }

  handleInputChanged(key, value) {
    this.setState({
      [key]: value,
    });
  }

  handleFormSubmit() {
    this.setState({
      showFormGeneralErrors: false
    });
    const { password, phone_number } = this.state;
    let canSubmit = this._isValidPhoneNumber(phone_number);
    if (canSubmit) {
      this.props.toggleIsLoggingIn();
      this.props
        .logInUser({
          phone_number,
          password,
        })
        .then(() => {
          this.goToHomeScreen();
        })
        .catch(() => { });
    } else {
      this.setState({
        showFormGeneralErrors: true
      });
    }
  }

  _isValidPhoneNumber(phone_number) {
    return /^\+[0-9]{1,3}[0-9]{8,12}$/.test(phone_number);
  }

  _isValidPassword(password) {
    return password.length > 6;
  }

  render() {
    const { isLoggingIn, navigation, errors } = this.props;
    const { password, phone_number, showFormGeneralErrors } = this.state;
    return (
      <Container>
        <Header>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <BackIcon fill={dark} size={24} />
          </TouchableOpacity>
          <RegisterButton onPress={() => navigation.navigate("Register")}>
            <RegisterButtonText>Inscription</RegisterButtonText>
          </RegisterButton>
        </Header>
        <Content>
          <Title>Connectez-vous avec votre numéro de téléphone</Title>
          <FormWrapper>
            <FormGroup>
              <InputForm
                autofocus
                keyboardType="phone-pad"
                selectionColor={dark}
                isValid={this._isValidPhoneNumber(phone_number)}
                placeholder="Numéro de téléphone"
                onChangeText={(text) => this.handleInputChanged("phone_number", text)}
              />
              {errors && errors["phone_number"] ? (
                <FormError>
                  <FormErrorText>{errors["phone_number"][0]}</FormErrorText>
                </FormError>
              ) : null}
            </FormGroup>
            <FormGroup>
              <InputForm
                placeholder="Mot de passe"
                secureTextEntry={true}
                isValid={this._isValidPassword(password)}
                onChangeText={(text) => this.handleInputChanged("password", text)}
                selectionColor={dark}
              />
              {errors && errors["password"] ? (
                <FormError>
                  <FormErrorText>{errors["password"][0]}</FormErrorText>
                </FormError>
              ) : null}
            </FormGroup>
            <FormGroup>
              {showFormGeneralErrors ? (
                <FormError>
                  <FormErrorText>
                    Le numéro de téléphone doit commencer par le code du pays. (Ex: +243)
                  </FormErrorText>
                </FormError>
              ) : null}
            </FormGroup>
            <FormGroup>
              <SubmitButton disabled={isLoggingIn} onPress={this.handleFormSubmit.bind(this)}>
                {isLoggingIn ? <ActivityIndicator color="#fff" /> : false}
                <SubmitButtonText>CONNEXION</SubmitButtonText>
              </SubmitButton>
            </FormGroup>
          </FormWrapper>
        </Content>
      </Container>
    );
  }
}

const Container = styled.View`
  flex: 1;
  padding: 15px;
`;

const Content = styled.View`
  padding: 10px;
`;

const Header = styled.View`
  margin-top: 24px;
  margin-bottom: 15px;
  flex-direction: row;
  justify-content: space-between;
`;

const Title = styled.Text`
  font-size: 30px;
  font-weight: bold;
  line-height: 32px;
  color: #222;
  margin-bottom: 15px;
`;

const FormWrapper = styled.View``;

const FormGroup = styled.View`
  margin-bottom: 15px;
`;

const InputForm = styled.TextInput`
  min-height: 40px;
  padding: 5px 10px;
  width: 100%;
  background-color: #f1f1f1;
  border-radius: 5px;
  border: ${(props) => (props.isValid ? "1px solid #0A942F" : "none")};
  height: 50px;
  color: ${dark};
  font-weight: bold;
  margin-bottom: 20px;
`;

const FormError = styled.View`
  margin-bottom: 10px;
  width: 100%;
`;

const FormErrorText = styled.Text`
  color: ${danger};
  font-size: 12px;
`;

const SubmitButton = styled.TouchableOpacity`
  width: 100%;
  border-radius: 2px;
  padding: 15px;
  background: ${darkLighten};
  margin-bottom: 15px;
  flex-direction: row;
  justify-content: center;
`;

const RegisterButton = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: center;
`;

const RegisterButtonText = styled.Text`
  font-size: 13px;
  text-transform: uppercase;
  color: ${dark};
  font-weight: bold;
`;

const SubmitButtonText = styled.Text`
  font-size: 13px;
  text-transform: uppercase;
  color: #fff;
  text-align: center;
  font-weight: bold;
`;

const mapDispatchToProps = (dispatch) => {
  return {
    logInUser: (payload) => dispatch(logInUser(payload)),
    toggleIsLoggingIn: () => dispatch(toggleIsLoggingIn()),
  };
};
const mapStateToProps = (state) => {
  return {
    isLoggingIn: state.auth.isLoggingIn,
    isLoggedIn: state.auth.isLoggedIn,
    errors: state.auth.loginErrors,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginWithPhoneNumberScreen);
