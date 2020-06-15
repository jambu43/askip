import React from "react";
import styled from "styled-components";
import { dark, darkLighten } from "../config/variables";
import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity, ActivityIndicator, View } from "react-native";
import { searchUsers } from "../store/actions/users";
import { connect } from "react-redux";
import orderBy from "lodash/orderBy";
import UserCard from "../components/user/UserCard";
import EmptyListNotification from "../components/generic/EmptyListNotification";
import { SearchIcon } from "../components/Icons";
import { searchMagazineReleases } from "../store/actions/magazines";
import MagazineReleaseCard from "../components/magazine/MagazineReleaseCard";

class MagazineSearchScreen extends React.Component {
  searchInput = null;
  state = {
    keywords: "",
    page: 1,
    publication_releases: {},
    publication_release_loading: false,
    inputFocused: false,
    has_triggered_search: false,
  };

  componentDidMount() {
    this.willFocusSubscription = this.props.navigation.addListener("willFocus", () => {
      if (this.state.keywords) {
        this._handleRefresh();
      }
    });
  }

  componentWillUnmount() {
    if (this.willFocusSubscription) {
      this.willFocusSubscription.remove();
    }
  }

  handleKeywordsChange(text) {
    if (!text) {
      this.setState({
        keywords: text,
        has_triggered_search: false,
        publication_releases: {},
      });
      if (this.searchInput) {
        this.searchInput.focus();
      }
    } else {
      this.setState({
        keywords: text,
        has_triggered_search: false,
      });
    }
  }

  toArray(map) {
    let mapValues = Object.values(map);
    return orderBy(mapValues, "title", "asc");
  }

  _handleLoadMore = () => {
    if (Object.values(this.state.publication_releases).length >= 10) {
      this.setState(
        (prevState, nextProps) => ({
          page: prevState.page + 1,
        }),
        () => {
          if (!this.state.publication_release_loading) {
            this.searchUsers();
          }
        }
      );
    }
  };

  _handleRefresh() {
    this.setState(
      (prevState, nextProps) => ({
        page: 1,
      }),
      () => {
        this.searchUsers();
      }
    );
  }

  toggleFocus() {
    this.setState({
      inputFocused: !this.state.inputFocused,
    });
  }

  _renderEmptyList() {
    if (
      !this.state.publication_release_loading &&
      this.state.keywords &&
      this.state.has_triggered_search
    ) {
      return (
        <EmptyListNotification
          title="Aucun résultat"
          message="Nous n'avons trouvé aucun resultat par rapport aux mots clefs saisi"
        />
      );
    }

    return null;
  }

  renderHeader() {
    if (this.state.publication_release_loading) {
      return (
        <View>
          <ActivityIndicator color="#fff" />
        </View>
      );
    }
    return null;
  }
  searchUsers() {
    this.setState({
      publication_release_loading: true,
    });

    this.props
      .searchMagazineReleases(this.state.keywords, this.state.page)
      .then((data) => {
        this.setState({ publication_releases: {}, has_triggered_search: true });
        data.forEach((item) => {
          this.setState({
            publication_releases: {
              ...this.state.publication_releases,
              [item.id]: item,
            },
          });
        });
      })
      .catch(() => {
        this.setState({
          publication_release_loading: false,
          has_triggered_search: true,
        });
      })
      .finally(() => {
        this.setState({
          publication_release_loading: false,
          has_triggered_search: true,
        });
      });
  }

  renderMagazine({ item, index }) {
    const { navigation } = this.props;
    return <MagazineReleaseCard size="lg" navigation={navigation} magazine={item} key={item.id} />;
  }

  render() {
    const { navigation } = this.props;
    const {
      keywords,
      publication_releases,
      publication_release_loading,
      inputFocused,
    } = this.state;
    let arrayPublicationReleases = this.toArray(publication_releases);
    return (
      <Container>
        <Header>
          <SearchInputWrapper>
            <SearchIcon fill="#fff" size={24} />
            <SearchInput
              ref={(ref) => (this.searchInput = ref)}
              returnKeyType="search"
              value={keywords}
              autoFocus={true}
              placeholder="Recherches des magazines"
              inputFocused={inputFocused}
              onFocus={this.toggleFocus.bind(this)}
              onBlur={this.toggleFocus.bind(this)}
              onSubmitEditing={this.searchUsers.bind(this)}
              onChangeText={this.handleKeywordsChange.bind(this)}
            />
            {keywords.length ? (
              <TouchableOpacity onPress={() => this.handleKeywordsChange("")}>
                <AntDesign name="close" size={24} color="#fff" />
              </TouchableOpacity>
            ) : null}
          </SearchInputWrapper>
        </Header>
        <Content
          keyExtractor={(item) => item.id.toString()}
          extraData={arrayPublicationReleases}
          data={arrayPublicationReleases}
          refreshing={publication_release_loading}
          renderItem={this.renderMagazine.bind(this)}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          ListHeaderComponent={this.renderHeader.bind(this)}
          ListEmptyComponent={this._renderEmptyList.bind(this)}
          onEndReached={this._handleLoadMore.bind(this)}
          onEndReachedThreshold={1}
          initialNumToRender={10}
        />
      </Container>
    );
  }
}

const Container = styled.View`
  background: ${dark};
  flex: 1;
  padding: 10px 0px;
`;

const Header = styled.View`
  margin-top: 24px;
  margin-bottom: 15px;
  flex-direction: row;
  align-items: center;
`;

const SearchInputWrapper = styled.View`
  flex-direction: row;
  padding: 5px 15px;
  align-items: center;
`;

const LoadingContent = styled.View`
  flex-direction: row;
  padding: 5px 15px;
  justify-content: center;
  min-height: 400px;
  align-items: center;
`;

const Content = styled.FlatList`
  padding: 0px 15px;
`;

const SearchInput = styled.TextInput`
  flex: 1;
  margin-right: 10px;
  padding: 5px 10px;
  color: #ccc;
  background-color: transparent;
`;

const mapStateToProps = (state) => {
  return {};
};
const mapPropsToDispatch = (dispatch) => {
  return {
    searchMagazineReleases: (keywords, page) => dispatch(searchMagazineReleases(keywords, page)),
  };
};
export default connect(mapStateToProps, mapPropsToDispatch)(MagazineSearchScreen);
