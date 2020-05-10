import React from "react";
import styled from "styled-components";
import AppHeader from "../../components/generic/AppHeader";
import { dark } from "../../config/variables";
import { connect } from "react-redux";
import { getUnReadNotifications } from "../../store/selectors/notification";
import { fetchNotifications } from "../../store/actions/notification";
import NotificationItem from "../../components/notification/NotificationItem";

class NotificationsScreen extends React.Component {
  state = {
    page: 1,
  };

  componentDidMount() {
    this._handleRefresh();
  }

  _handleRefresh() {
    this.setState({
      page: 1,
    });

    this.props.fetchNotifications();
  }

  _handleLoadMore = () => {
    this.setState(
      (prevState, nextProps) => ({
        page: prevState.page + 1,
      }),
      () => {
        this.props.fetchNotifications(this.state.page);
      }
    );
  };

  _renderEmptyList() {
    return (
      <EmptyNotificationWrapper>
        <Title> Aucune notification </Title>
        <Text>Vous n'avez aucune notification pour le moment.</Text>
      </EmptyNotificationWrapper>
    );
  }

  handleNotificationClick(notification) {}

  _renderNotification({ item }) {
    return (
      <NotificationItem notification={item} onPress={this.handleNotificationClick.bind(this)} />
    );
  }

  render() {
    const { navigation, notifications, notifications_loading } = this.props;
    console.log(notifications);
    return (
      <Container>
        <AppHeader navigation={navigation} showBack={true} showAvatar={false} />
        <Content
          keyExtractor={(item) => item.id.toString()}
          extraData={notifications}
          data={notifications}
          ListEmptyComponent={this._renderEmptyList}
          refreshing={notifications_loading}
          onRefresh={this._handleRefresh.bind(this)}
          renderItem={this._renderNotification.bind(this)}
          showsVerticalScrollIndicator={true}
          numColumns={1}
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

const EmptyNotificationWrapper = styled.View`
  justify-content: center;
  min-height: 400px;
`;

const Content = styled.FlatList`
  padding: 10px;
`;

const Image = styled.Image`
  height: 240px;
  width: 240px;
  margin: 0 auto;
  margin-bottom: 25px;
`;

const Title = styled.Text`
  font-size: 30px;
  font-weight: bold;
  line-height: 32px;
  color: #fff;
  margin-bottom: 15px;
  text-align: center;
`;

const Text = styled.Text`
  color: #fff;
  margin-bottom: 15px;
  text-align: center;
`;

const mapStateToProps = (state) => {
  return {
    notifications: getUnReadNotifications(state),
    notifications_loading: state.notification.notifications_loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchNotifications: (page) => dispatch(fetchNotifications(page)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NotificationsScreen);
