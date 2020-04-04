import React from "react";
import styled from "styled-components";
import { TouchableOpacity, ScrollView } from "react-native";
import MagazineReleaseCard from "../magazine/MagazineReleaseCard";
import { darkLighten } from "../../config/variables";

const MagazineReleaseList = ({ show_more, onClick, title, magazines, navigation }) => {
  return (
    <Container>
      <Header>
        <TouchableOpacity disabled={!show_more} onPress={onClick}>
          <Title>{title}</Title>
        </TouchableOpacity>
      </Header>
      <Content>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {magazines.map((magazine) => (
            <MagazineReleaseCard
              size="md"
              navigation={navigation}
              magazine={magazine}
              key={magazine.id}
            />
          ))}
          <ExploreMagazines
            onPress={() => {
              navigation.navigate("Magazines");
            }}
          >
            <ExploreMagazinesText>Explorer les magazines</ExploreMagazinesText>
          </ExploreMagazines>
        </ScrollView>
      </Content>
    </Container>
  );
};

export default MagazineReleaseList;

const Container = styled.View`
  padding: 0 15px;
  margin-bottom: 25px;
`;
const Title = styled.Text`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #fff;
  text-transform: uppercase;
`;
const Content = styled.View``;
const Header = styled.View``;
const ExploreMagazines = styled.TouchableOpacity`
  width: 135px;
  height: 180px;
  background: ${darkLighten};
  border-radius: 5px;
  justify-content: center;
`;

const ExploreMagazinesText = styled.Text`
  color: #fff;
  text-transform: uppercase;
  text-align: center;
  font-size: 12px;
`;
