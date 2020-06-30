import React from "react";
import moment from "moment";
import styled from "styled-components";
import { cutText, assetsUrl } from "../../helpers";

export default class MagazineReleaseCard extends React.Component {
  render() {
    const { magazine, size, navigation } = this.props;
    let isVerified = parseInt(magazine.magazine.is_verified) === 1;
    return (
      <Container
        size={size}
        onPress={() => navigation.push("Magazine", { magazine_release_id: magazine.id })}
      >
        <MagazineCover size={size} source={{ uri: assetsUrl(magazine.cover_image) }} />
        <MagazineTitle>{cutText(magazine.title, 30)}</MagazineTitle>
        <MagazineReleaseEdition>
          {moment(magazine.publication_date).format("MMMM YYYY")}
        </MagazineReleaseEdition>
        <MagazineCardDivider>
          <MagazineReleaseName>{magazine.magazine.name}</MagazineReleaseName>
          {isVerified ? (
            <MagazineVerifiedIcon source={require("../../assets/verified.png")} />
          ) : null}
        </MagazineCardDivider>
      </Container>
    );
  }
}

const Container = styled.TouchableOpacity`
  width: ${(props) => (props.size == "lg" ? "48%" : "135px")};
  height: auto;
  margin-right: ${(props) => (props.size == "lg" ? "15px" : "15px")};
  margin-bottom: 15px;
`;
const MagazineCover = styled.Image`
  width: ${(props) => (props.size == "lg" ? "100%" : "135px")};
  height: ${(props) => (props.size == "lg" ? "220px" : "180px")};
  border-radius: 5px;
  background: #f1f1f1;
  margin-bottom: 5px;
`;
const MagazineCardDivider = styled.View`
  flex-direction: row;
`;

const MagazineVerifiedIcon = styled.Image`
  height: 13px;
  width: 13px;
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
  margin-right: 5px;
`;
