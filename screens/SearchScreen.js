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

class SearchScreen extends React.Component {
  searchInput = null;
  state = {
    keywords: "",
    page: 1,
    users: {},
    users_loading: false,
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
        users: {},
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
    return orderBy(mapValues, "name", "asc");
  }

  _handleLoadMore = () => {
    if (Object.values(this.state.users).length >= 10) {
      this.setState(
        (prevState, nextProps) => ({
          page: prevState.page + 1,
        }),
        () => {
          if (!this.state.users_loading) {
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
    if (!this.state.users_loading && this.state.keywords && this.state.has_triggered_search) {
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
    if (this.state.users_loading) {
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
      users_loading: true,
    });

    this.props
      .searchUsers(this.state.keywords, this.state.page)
      .then((data) => {
        this.setState({ users: {}, has_triggered_search: true });
        data.forEach((item) => {
          this.setState({
            users: {
              ...this.state.users,
              [item.id]: item,
            },
          });
        });
      })
      .catch(() => {
        this.setState({
          users_loading: false,
          has_triggered_search: true,
        });
      })
      .finally(() => {
        this.setState({
          users_loading: false,
          has_triggered_search: true,
        });
      });
  }

  renderUser({ item, index }) {
    return <UserCard user={item} navigation={this.props.navigation} />;
  }

  render() {
    const { navigation } = this.props;
    const { keywords, users, users_loading, inputFocused } = this.state;
    let arrayUsers = this.toArray(users);
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
              placeholder="Recherches des personnes"
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
          extraData={arrayUsers}
          data={arrayUsers}
          refreshing={users_loading}
          renderItem={this.renderUser.bind(this)}
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

const Content = styled.FlatList``;

const CancelSearchText = styled.Text`
  color: #fff;
  font-size: 14px;
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
    searchUsers: (keywords, page) => dispatch(searchUsers(keywords, page)),
  };
};
export default connect(mapStateToProps, mapPropsToDispatch)(SearchScreen);
