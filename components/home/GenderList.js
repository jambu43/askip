import React from "react";
import styled from "styled-components";
import { TouchableOpacity, ScrollView } from "react-native";
import GenderCard from "./GenderCard";

export const GenderList = ({ show_more, onClick, title, genders }) => {
  return (
    <Container>
      <Header>
        <TouchableOpacity disabled={!show_more} onPress={onClick}>
          <Title>{title}</Title>
        </TouchableOpacity>
      </Header>
      <Content>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {genders.map(item => (
            <GenderCard
              gender={item}
              background={item.background}
              color={item.color}
              key={item.id}
            />
          ))}
        </ScrollView>
      </Content>
    </Container>
  );
};

const Container = styled.View`
  padding: 0 15px;
  margin: 15px 0;
`;
const Title = styled.Text`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
`;
const Content = styled.View``;
const Header = styled.View``;
