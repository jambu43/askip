import React from "react";
import styled from "styled-components";
import { dark } from "../config/variables";
import { connect } from "react-redux";
import { fetchMagazineReleases } from "../store/actions/magazines";
import { getMagazinesReleases } from "../store/selectors/magazine";
import MagazineReleaseCard from "../components/magazine/MagazineReleaseCard";
import { TouchableOpacity } from "react-native";
import { BackIcon, SearchIcon } from "../components/Icons";

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
    this.setState(
      (prevState, nextProps) => ({
        page: 1,
      }),
      () => {
        this.props.fetchMagazineReleases(this.state.page);
      }
    );
  }

  _handleLoadMore = () => {
    this.setState(
      (prevState, nextProps) => ({
        page: prevState.page + 1,
      }),
      () => {
        this.props.fetchMagazineReleases(this.state.page);
      }
    );
  };

  renderMagazine({ item, index }) {
    const { navigation } = this.props;
    return <MagazineReleaseCard size="lg" navigation={navigation} magazine={item} key={item.id} />;
  }

  renderHeader() {
    return (
      <ContentHeader>
        <ContentHeaderTitle>Magazines</ContentHeaderTitle>
        <ContentHeaderDescription>
          Askip , nous lisons des magazines en nous amusant et de manière totalement décomplexée.
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
          <TouchableOpacity onPress={() => navigation.navigate("MagazineSearch")}>
            <SearchIcon fill="#fff" size={24} />
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
          onEndReached={this._handleLoadMore.bind(this)}
          onEndReachedThreshold={0.5}
          initialNumToRender={10}
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
  justify-content: space-between;
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
