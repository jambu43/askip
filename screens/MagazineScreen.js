import React from "react";
import { MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";
import { connect } from "react-redux";
import styled from "styled-components";
import { dark, danger, darkLighten } from "../config/variables";
import { fetchMagazineRelease } from "../store/actions/magazines";
import { getMagazineReleaseById } from "../store/selectors/magazine";
import { assetsUrl, cutText } from "../helpers";
import moment from "moment";
import ArticlePreviewCard from "../components/magazine/ArticlePreviewCard";
import { togglePublicationRelease } from "../store/actions/auth";
import { ActivityIndicator } from "react-native";

class MagazineScreen extends React.Component {
  state = {
    show_all_text: false,
    toggling_publication_release: false,
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

  handlePublicationReleaseButton() {
    const { navigation } = this.props;
    let publicationReleaseId = navigation.getParam("magazine_release_id");
    this.setState({
      toggling_publication_release: true,
    });
    this.props
      .togglePublicationRelease(publicationReleaseId)
      .then(() => { })
      .catch(() => { })
      .finally(() => {
        this.setState({
          toggling_publication_release: false,
        });
      });
  }

  render() {
    const { magazine_release, publication_releases_read, navigation } = this.props;
    let hasUserReadMagazine = publication_releases_read.includes(magazine_release.id.toString());
    const { show_all_text, toggling_publication_release } = this.state;
    let textLength = show_all_text ? magazine_release.description.length : 135;
    return (
      <Container>
        <StickyHeader onPress={() => navigation.goBack()}>
          <AntDesign name="close" size={24} color="#fff" />
        </StickyHeader>
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
            <ReadMagazineButton
              hasRead={hasUserReadMagazine}
              disabled={toggling_publication_release}
              onPress={this.handlePublicationReleaseButton.bind(this)}
            >
              {toggling_publication_release ? (
                <ActivityIndicator color="#fff" size="small" />
              ) : null}
              <ReadMagazineButtonText>
                {hasUserReadMagazine ? "RETIRER DE MA LISTE" : "COMMENCER À LIRE"}
              </ReadMagazineButtonText>
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
              <MaterialCommunityIcons name="eye-check" color="#fff" size={24} />
              <MagazineInfoItemTitle>
                {magazine_release.readers_count} lecteurs
              </MagazineInfoItemTitle>
            </MagazineInfoItem>

            <MagazineInfoItem>
              <MaterialCommunityIcons name="calendar-today" color="#fff" size={24} />
              <MagazineInfoItemTitle>
                {moment(magazine_release.publication_date).format("MMMM YYYY")}
              </MagazineInfoItemTitle>
            </MagazineInfoItem>
          </MagazineInfoWrapper>
          <MagazineArticlesWrapper>
            {magazine_release.articles.map(item => {
              return <ArticlePreviewCard key={item.id} article={item} navigation={navigation} />;
            })}
          </MagazineArticlesWrapper>
        </Content>
      </Container>
    );
  }
}

const Container = styled.View`
  flex: 1;
  background-color: ${dark};
  position: relative;
  margin-top: 24px;
`;

const StickyHeader = styled.TouchableOpacity`
  position: absolute;
  width: 35px;
  height: 35px;
  background: ${darkLighten};
  top: 10px;
  left: 10px;
  justify-content: center;
  align-items: center;
  z-index: 10px;
  border-radius: 25px;
`;

const Content = styled.ScrollView``;
const MagazineCoverWrapper = styled.View``;
const MagazineCover = styled.Image`
  width: 100%;
  height: 320px;
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
  color: #f1f1f1;
`;

const ReadMagazineButton = styled.TouchableOpacity`
  padding: 10px 12px;
  background: ${props => (props.hasRead ? dark : danger)};
  margin-bottom: 10px;
  flex-direction: row;
  justify-content: center;
  border-color: ${props => (props.hasRead ? darkLighten : dark)};
  border-width: ${props => (props.hasRead ? 1 : 0)}px;
  border-radius: 5px;
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

const MagazineArticlesWrapper = styled.View`
  padding: 10px 15px;
`;
const mapDispatchToProps = dispatch => {
  return {
    fetchMagazineRelease: publicationReleaseId =>
      dispatch(fetchMagazineRelease(publicationReleaseId)),
    togglePublicationRelease: publicationReleaseId =>
      dispatch(togglePublicationRelease(publicationReleaseId)),
  };
};

const mapStateToProps = (state, props) => {
  return {
    magazine_release: getMagazineReleaseById(state, props),
    publication_releases_read: state.auth.user.publication_releases_read,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(MagazineScreen);
