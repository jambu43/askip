import React from "react";
import styled from "styled-components";
import { TouchableOpacity, ScrollView } from "react-native";
import MagazineReleaseCard from "../magazine/MagazineReleaseCard";

const MagazineReleaseList = ({ show_more, onClick, title, magazines }) => {
  return (
    <Container>
      <Header>
        <TouchableOpacity disabled={!show_more} onPress={onClick}>
          <Title>{title}</Title>
        </TouchableOpacity>
      </Header>
      <Content>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {magazines.map(magazine => (
            <MagazineReleaseCard magazine={magazine} key={magazine.id} />
          ))}
        </ScrollView>
      </Content>
    </Container>
  );
};

export default MagazineReleaseList;

const Container = styled.View`
  padding: 0 15px;
`;
const Title = styled.Text`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #fff;
`;
const Content = styled.View``;
const Header = styled.View``;
