import React from "react";
import styled from "styled-components";
import { registerUser, toggleIsLoggingIn } from "../store/actions/auth";
import { connect } from "react-redux";
import { dark, darkLighten } from "../config/variables";
import { TouchableOpacity } from "react-native";
import { BackIcon } from "../components/Icons";

class RegisterScreen extends React.Component {
  handleFormSubmit() {}

  render() {
    const { isLoggingIn, navigation } = this.props;
    return (
      <Container>
        <Header>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <BackIcon fill={dark} size={24} />
          </TouchableOpacity>
        </Header>
        <Content>
          <Title>Inscrivez-vous avec votre numéro de téléphone</Title>
          <FormWrapper>
            <FormGroup>
              <InputForm autofocus selectionColor={dark} placeholder="Prémon et nom" />
            </FormGroup>

            <FormGroup>
              <InputForm
                autofocus
                keyboardType="phone-pad"
                selectionColor={dark}
                placeholder="Numéro de téléphone"
              />
            </FormGroup>
            <FormGroup>
              <InputForm placeholder="Mot de passe" selectionColor={dark} />
            </FormGroup>
            <FormGroup>
              <SubmitButton disabled={isLoggingIn} onPress={this.handleFormSubmit.bind(this)}>
                <SubmitButtonText>INSCRIPTION</SubmitButtonText>
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
  height: 50px;
  color: ${dark};
  font-weight: bold;
  margin-bottom: 20px;
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

export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen);
