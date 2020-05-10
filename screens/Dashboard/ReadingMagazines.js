import React from "react";
import styled from "styled-components";
import { ScrollView } from "react-native";

class ReadingMagazines extends React.Component {
  render() {
    return (
      <View>
        <Title>Mes Magazine</Title>
        <CenterMagazineContent>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {magazines_publication_releases
              .filter((item) => user.publication_releases_read.includes(item.id.toString()))
              .map((magazine) => (
                <UserMagazine navigation={navigation} magazine={magazine} key={magazine.id} />
              ))}
          </ScrollView>
        </CenterMagazineContent>
      </View>
    );
  }
}

const Container = styled.View`
  flex: 1;
  background-color: ${dark};
`;

const Title = styled.Text`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
  margin-top: 10px;
  color: #fff;
  text-transform: uppercase;
  margin-left: 10px;
`;

const CenterMagazineContent = styled.View`
  justify-content: center;
`;
