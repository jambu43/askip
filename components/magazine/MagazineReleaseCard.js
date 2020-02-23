import React from "react";
import moment from "moment";
import styled from "styled-components";
import { cutText, assetsUrl } from "../../helpers";

export default class MagazineReleaseCard extends React.Component {
  render() {
    const { magazine, navigation } = this.props;
    return (
      <Container onPress={() => navigation.push("Magazine", { magazine_release_id: magazine.id })}>
        <MagazineCover source={{ uri: assetsUrl(magazine.cover_image) }} />
        <MagazineTitle>{cutText(magazine.title, 30)}</MagazineTitle>
        <MagazineReleaseEdition>
          {moment(magazine.publication_date).format("MMMM YYYY")}
        </MagazineReleaseEdition>
        <MagazineReleaseName>{magazine.magazine.name} fans</MagazineReleaseName>
      </Container>
    );
  }
}

const Container = styled.TouchableOpacity`
  width: 135px;
  height: auto;
  margin-right: 15px;
`;
const MagazineCover = styled.Image`
  width: 135px;
  height: 180px;
  border-radius: 5px;
  background: #f1f1f1;
  margin-bottom: 5px;
`;
const MagazineTitle = styled.Text`
  color: #fff;
  font-weight: bold;
  font-size: 14px;
  margin-bottom: 5px;
`;
const MagazineReleaseEdition = styled.Text`
  color: #92929d;
  font-size: 12px;
  margin-bottom: 5px;
`;

const MagazineReleaseName = styled.Text`
  color: #fff;
  font-size: 11px;
  font-weight: bold;
  margin-bottom: 5px;
`;
