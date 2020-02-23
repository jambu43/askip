import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { connect } from "react-redux";
import styled from "styled-components";
import { dark, danger, darkLighten } from "../config/variables";
import { fetchMagazineRelease } from "../store/actions/magazines";
import { getMagazineReleaseById } from "../store/selectors/magazine";
import { assetsUrl, cutText } from "../helpers";
import moment from "moment";

class MagazineScreen extends React.Component {
  state = {
    show_all_text: false,
  };

  componentDidMount() {
    this._fetchMagazineData();
    this.willFocusSubscription = this.props.navigation.addListener("willFocus", () => {
      this._fetchMagazineData();
    });
  }

  componentWillUnmount() {
    if (this.willFocusSubscription) {
      this.willFocusSubscription.remove();
    }
  }

  _fetchMagazineData() {
    const { navigation } = this.props;
    let publicationReleaseId = navigation.getParam("magazine_release_id");
    this.props.fetchMagazineRelease(publicationReleaseId);
  }

  toggleShowAllText() {
    this.setState({
      show_all_text: !this.state.show_all_text,
    });
  }
  render() {
    const { magazine_release, navigation } = this.props;
    const { show_all_text } = this.state;
    let textLength = show_all_text ? magazine_release.description.length : 135;
    return (
      <Container>
        <Content>
          <MagazineCoverWrapper>
            <MagazineCover
              source={{ uri: assetsUrl(magazine_release.cover_image) }}
            ></MagazineCover>
          </MagazineCoverWrapper>
          <MagazineContentWrapper>
            <Title>{magazine_release.title}</Title>
            <Description>{cutText(magazine_release.description, textLength)}</Description>
            <ReadMore onPress={this.toggleShowAllText.bind(this)}>
              <ReadMoreText>{show_all_text ? "Lire moins" : "Lire plus"}</ReadMoreText>
            </ReadMore>
            <ReadMagazineButton>
              <ReadMagazineButtonText>COMMENCER À LIRE</ReadMagazineButtonText>
            </ReadMagazineButton>
          </MagazineContentWrapper>
          <MagazineInfoWrapper>
            <MagazineInfoItem>
              <MaterialCommunityIcons name="file-document-outline" color="#fff" size={24} />
              <MagazineInfoItemTitle>
                {magazine_release.articles_count} Articles
              </MagazineInfoItemTitle>
            </MagazineInfoItem>

            <MagazineInfoItem>
              <MaterialCommunityIcons name="calendar-today" color="#fff" size={24} />
              <MagazineInfoItemTitle>
                {moment(magazine_release.publication_date).format("MMMM YYYY")}
              </MagazineInfoItemTitle>
            </MagazineInfoItem>
          </MagazineInfoWrapper>
        </Content>
      </Container>
    );
  }
}

const Container = styled.View`
  flex: 1;
  background-color: ${dark};
`;
const Content = styled.ScrollView``;
const MagazineCoverWrapper = styled.View``;
const MagazineCover = styled.Image`
  width: 100%;
  height: 360px;
`;
const MagazineContentWrapper = styled.View`
  padding: 15px;
`;
const Title = styled.Text`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #fff;
`;
const Description = styled.Text`
  color: #fff;
`;
const ReadMore = styled.TouchableOpacity`
  margin-bottom: 15px;
  align-self: flex-start;
`;
const ReadMoreText = styled.Text`
  color: ${danger};
`;

const ReadMagazineButton = styled.TouchableOpacity`
  padding: 10px 12px;
  background: ${danger};
  margin-bottom: 10px;
`;
const ReadMagazineButtonText = styled.Text`
  text-align: center;
  color: #fff;
  font-weight: bold;
`;

const MagazineInfoWrapper = styled.View`
  padding: 10px 15px;
  background: ${darkLighten};
  margin-bottom: 10px;
`;

const MagazineInfoItem = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 5px;
`;
const MagazineInfoItemTitle = styled.Text`
  margin-left: 15px;
  color: #fff;
`;
const mapDispatchToProps = dispatch => {
  return {
    fetchMagazineRelease: publicationReleaseId =>
      dispatch(fetchMagazineRelease(publicationReleaseId)),
  };
};

const mapStateToProps = (state, props) => {
  return {
    magazine_release: getMagazineReleaseById(state, props),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(MagazineScreen);
