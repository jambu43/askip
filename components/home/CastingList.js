import React from "react";
import styled from "styled-components";
import { TouchableOpacity, ScrollView } from "react-native";
import { CastingCard } from "./CastingCard";

export const CastingList = ({ show_more, onClick, title, castings }) => {
  return (
    <Container>
      <Header>
        <TouchableOpacity disabled={!show_more} onPress={onClick}>
          <Title>{title}</Title>
        </TouchableOpacity>
      </Header>
      <Content>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {castings.map(item => (
            <CastingCard casting={item} key={item.casting_id} />
          ))}
        </ScrollView>
      </Content>
    </Container>
  );
};

const Container = styled.View`
  padding: 0 15px;
`;
const Title = styled.Text`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
`;
const Content = styled.View``;
const Header = styled.View``;
