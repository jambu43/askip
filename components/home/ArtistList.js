import React from "react";
import styled from "styled-components";
import { TouchableOpacity, ScrollView } from "react-native";
import ArtistCard from "./ArtistCard";

export const ArtistList = ({
  show_more,
  onClick,
  title,
  artists,
  navigation
}) => {
  return (
    <Container>
      <Header>
        <TouchableOpacity disabled={!show_more} onPress={onClick}>
          <Title>{title}</Title>
        </TouchableOpacity>
      </Header>
      <Content>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {artists.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() =>
                navigation.navigate("Artist", { artist_id: item.id })
              }
            >
              <ArtistCard artist={item} />
            </TouchableOpacity>
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
