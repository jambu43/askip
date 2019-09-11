import React from "react";
import styled from "styled-components";
import { TouchableOpacity, ScrollView } from "react-native";
import AlbumCard from "./AlbumCard";

export const AlbumList = ({ show_more, onClick, title, albums }) => {
  return (
    <Container>
      <Header>
        <TouchableOpacity disabled={!show_more} onPress={onClick}>
          <Title>{title}</Title>
        </TouchableOpacity>
      </Header>
      <Content>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {albums.map(item => (
            <AlbumCard album={item} key={item.song_id} />
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
