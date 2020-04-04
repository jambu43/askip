import React from "react";
import styled from "styled-components";
import { dark } from "../config/variables";
import { connect } from "react-redux";
import AppHeader from "../components/generic/AppHeader";
import { fetchMagazineReleases } from "../store/actions/magazines";
import { getMagazinesReleases } from "../store/selectors/magazine";
import MagazineReleaseCard from "../components/magazine/MagazineReleaseCard";
import { ScrollView, TouchableOpacity } from "react-native";
import { BackIcon } from "../components/Icons";

class MagazinesScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
    };
  }

  componentDidMount() {
    this.props.fetchMagazineReleases(this.state.page);
  }

  _handleRefresh() {
    this.props.fetchMagazineReleases(this.state.page);
  }

  renderMagazine({ item, index }) {
    const { navigation } = this.props;
    return <MagazineReleaseCard size="lg" navigation={navigation} magazine={item} key={item.id} />;
  }

  renderHeader() {
    return (
      <ContentHeader>
        <ContentHeaderTitle>Magazines</ContentHeaderTitle>
        <ContentHeaderDescription>
          La lecture, c'est une vertu irremplaçable qui enrichie le savoir et fortifie la mémoire.
        </ContentHeaderDescription>
      </ContentHeader>
    );
  }
  render() {
    const { magazines, navigation, magazine_loading } = this.props;
    return (
      <Container>
        <Header>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <BackIcon fill="#fff" size={24} />
          </TouchableOpacity>
        </Header>
        <Content
          keyExtractor={(item) => item.id.toString()}
          extraData={magazines}
          data={magazines}
          refreshing={magazine_loading}
          onRefresh={this._handleRefresh.bind(this)}
          ListHeaderComponent={this.renderHeader.bind(this)}
          renderItem={this.renderMagazine.bind(this)}
          showsVerticalScrollIndicator={false}
          numColumns={2}
        />
      </Container>
    );
  }
}

const Container = styled.View`
  background: ${dark};
  flex: 1;
  padding: 10px 15px;
`;

const Content = styled.FlatList``;

const Header = styled.View`
  margin-top: 24px;
  margin-bottom: 15px;
  flex-direction: row;
  align-items: center;
`;

const ContentHeader = styled.View`
  width: 100%;
  margin-bottom: 25px;
`;
const ContentHeaderTitle = styled.Text`
  color: #fff;
  font-size: 25px;
  font-weight: bold;
  margin-bottom: 10px;
`;
const ContentHeaderDescription = styled.Text`
  color: #fff;
  font-size: 18px;
`;

const mapStateToProps = (state) => {
  return {
    magazines: getMagazinesReleases(state),
    magazine_loading: state.magazine.magazines_publication_releases_loading,
  };
};
const mapPropsToDispatch = (dispatch) => {
  return {
    fetchMagazineReleases: (page) => dispatch(fetchMagazineReleases(page)),
  };
};
export default connect(mapStateToProps, mapPropsToDispatch)(MagazinesScreen);
