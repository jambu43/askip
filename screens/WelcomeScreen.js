import React from "react";
import styled from "styled-components";
import { TouchableOpacity } from "react-native";

export default class WelcomeScreen extends React.Component {
  render() {
    const { navigation } = this.props;
    return (
      <Container>
        <Image source={require("../assets/welcome.png")} />
        <Title>Vivez une expérience de musicale unique.</Title>
        <Text>
          magnam dolores maxime at voluptates nihil iste hic fflibero architecto
          vitae quod veniam? Repellendus! magnam dolores.
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <NextButton>
            <ButtonIcon source={require("../assets/chevron_right.png")} />
          </NextButton>
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
  margin-bottom: 25px;
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

const ButtonIcon = styled.Image`
  height: 24px;
  width: 24px;
`;

const NextButton = styled.View`
  width: 100%;
  border-radius: 2px;
  padding: 15px;
  margin-bottom: 15px;
  flex-direction: row;
  justify-content: flex-end;
`;
