import React from "react";
import styled from "styled-components";
import AppHeader from "../../components/generic/AppHeader";
import { dark } from "../../config/variables";
import { connect } from "react-redux";
import { getUserFollowers } from "../../store/selectors/user";
import { fetchUserFollowers } from "../../store/actions/users";
import UserCard from "../../components/user/UserCard";

class UserFollowersScreen extends React.Component {
  state = {
    page: 1,
  };

  componentDidMount() {
    this.fetchUserFollowers();
  }

  _handleRefresh() {
    this.setState({
      page: 1,
    });
    this.fetchUserFollowers();
  }

  _handleLoadMore = () => {
    this.setState(
      (prevState, nextProps) => ({
        page: prevState.page + 1,
      }),
      () => {
        this.fetchUserFollowers(this.state.page);
      }
    );
  };

  fetchUserFollowers() {
    this.props.fetchUserFollowers(this.state.page);
  }

  _renderFollower({ item }) {
    return <UserCard user={item} navigation={this.props.navigation} />;
  }

  renderHeader() {
    return (
      <ContentHeader>
        <ContentHeaderTitle>Mes abonnés</ContentHeaderTitle>
        <ContentHeaderDescription>
          Les réseaux sociaux, c'est l'amitié sans engagement.
        </ContentHeaderDescription>
      </ContentHeader>
    );
  }

  render() {
    const { navigation, followers, followers_loading } = this.props;
    return (
      <Container>
        <AppHeader navigation={navigation} showBack={true} showAvatar={false} />
        <Content
          keyExtractor={(item) => item.id.toString()}
          extraData={followers}
          data={followers}
          refreshing={followers_loading}
          onRefresh={this._handleRefresh.bind(this)}
          renderItem={this._renderFollower.bind(this)}
          ListHeaderComponent={this.renderHeader.bind(this)}
          showsVerticalScrollIndicator={true}
          numColumns={2}
          onEndReached={this._handleLoadMore.bind(this)}
          onEndReachedThreshold={1}
          initialNumToRender={10}
        />
      </Container>
    );
  }
}

const Container = styled.View`
  flex: 1;
  background: ${dark};
`;
const Content = styled.FlatList``;

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

const mapStateToProps = (state, props) => {
  return {
    followers: getUserFollowers(state, props),
    followers_loading: state.user.currentUserFollowersLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserFollowers: (page) => dispatch(fetchUserFollowers(page)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserFollowersScreen);
