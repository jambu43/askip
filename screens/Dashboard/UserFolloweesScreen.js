import React from "react";
import styled from "styled-components";
import AppHeader from "../../components/generic/AppHeader";
import { dark } from "../../config/variables";
import { connect } from "react-redux";
import { getUserFollowees } from "../../store/selectors/user";
import { fetchUserFollowees } from "../../store/actions/users";
import UserCard from "../../components/user/UserCard";

class UserFolloweesScreen extends React.Component {
  state = {
    page: 1,
  };

  componentDidMount() {
    this.fetchUserFollowees();
  }

  _handleRefresh() {
    this.setState({
      page: 1,
    });
    this.fetchUserFollowees();
  }

  _handleLoadMore = () => {
    this.setState(
      (prevState, nextProps) => ({
        page: prevState.page + 1,
      }),
      () => {
        this.fetchUserFollowees(this.state.page);
      }
    );
  };

  fetchUserFollowees() {
    this.props.fetchUserFollowees(this.state.page);
  }

  _renderFollower({ item }) {
    return <UserCard user={item} navigation={this.props.navigation} />;
  }

  renderHeader() {
    return (
      <ContentHeader>
        <ContentHeaderTitle>Mes abonnements</ContentHeaderTitle>
        <ContentHeaderDescription>
          Les réseaux sociaux, c'est l'amitié sans engagement.
        </ContentHeaderDescription>
      </ContentHeader>
    );
  }

  render() {
    const { navigation, followees, followees_loading } = this.props;
    return (
      <Container>
        <AppHeader navigation={navigation} showBack={true} showAvatar={false} />
        <Content
          keyExtractor={(item) => item.id.toString()}
          extraData={followees}
          data={followees}
          refreshing={followees_loading}
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
    followees: getUserFollowees(state, props),
    followees_loading: state.user.currentUserFolloweesLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserFollowees: (page) => dispatch(fetchUserFollowees(page)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserFolloweesScreen);
