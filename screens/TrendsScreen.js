import React from "react";
import styled from "styled-components";
import { dark } from "../config/variables";
import { connect } from "react-redux";
import { TouchableOpacity } from "react-native";
import { BackIcon } from "../components/Icons";
import { fetchTrends } from "../store/actions/users";
import orderBy from "lodash/orderBy";
import UserCard from "../components/user/UserCard";

class TrendsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      users: {},
      users_loading: false,
    };
  }

  componentDidMount() {
    this._handleRefresh();
  }

  toArray(map) {
    let mapValues = Object.values(map);
    return orderBy(mapValues, "name", "asc");
  }

  _handleRefresh() {
    this.setState(
      (prevState, nextProps) => ({
        page: 1,
      }),
      () => {
        this.fetchTrends();
      }
    );
  }

  fetchTrends() {
    this.setState({
      users_loading: true,
    });

    this.props
      .fetchTrends(this.state.page)
      .then((data) => {
        data.forEach((item) => {
          this.setState({
            users: {
              ...this.state.users,
              [item.id]: item,
            },
          });
        });
      })
      .finally(() => {
        this.setState({
          users_loading: false,
        });
      });
  }

  _handleLoadMore = () => {
    this.setState(
      (prevState, nextProps) => ({
        page: prevState.page + 1,
      }),
      () => {
        this.fetchTrends();
      }
    );
  };

  renderUser({ item, index }) {
    return <UserCard user={item} navigation={this.props.navigation} />;
  }

  renderHeader() {
    return (
      <ContentHeader>
        <ContentHeaderTitle>Tendances</ContentHeaderTitle>
        <ContentHeaderDescription>
          La mode est ce que l'on porte. Ce qui est démodé, c'est ce que portent les autres.
        </ContentHeaderDescription>
      </ContentHeader>
    );
  }
  render() {
    const { navigation } = this.props;
    const { users, users_loading } = this.state;
    let arrayUsers = this.toArray(users);
    console.log(arrayUsers);
    return (
      <Container>
        <Header>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <BackIcon fill="#fff" size={24} />
          </TouchableOpacity>
        </Header>
        <Content
          keyExtractor={(item) => item.id.toString()}
          extraData={arrayUsers}
          data={arrayUsers}
          refreshing={users_loading}
          onRefresh={this._handleRefresh.bind(this)}
          ListHeaderComponent={this.renderHeader.bind(this)}
          renderItem={this.renderUser.bind(this)}
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
  padding: 10px 0px;
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
  margin-bottom: 10px;
  padding: 0px 10px;
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
  return {};
};
const mapPropsToDispatch = (dispatch) => {
  return {
    fetchTrends: (page) => dispatch(fetchTrends(page)),
  };
};
export default connect(mapStateToProps, mapPropsToDispatch)(TrendsScreen);
