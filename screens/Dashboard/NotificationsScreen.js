import React from "react";
import styled from "styled-components";
import AppHeader from "../../components/generic/AppHeader";
import { dark } from "../../config/variables";
import { connect } from "react-redux";
import { getUnReadNotifications, getReadNotifications } from "../../store/selectors/notification";
import { fetchNotifications, markNotificationAsRead } from "../../store/actions/notification";
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

  handleNotificationClick(notification) {
    const { navigation } = this.props;
    switch (notification.type) {
      case "POST_SHARE":
        navigation.navigate("Post", { post_id: notification.sourcePost.id });
        break;
      case "POST_COMMENT":
        navigation.navigate("Post", { post_id: notification.sourcePost.id });
        break;
      case "FOLLOW":
        navigation.navigate("Profile", { user_id: notification.sourceUser.id });
        break;
    }
    this.props.markNotificationAsRead(notification.id);
  }

  _renderNotification({ item }) {
    return (
      <NotificationItem
        notification={item}
        key={item.id}
        read={parseInt(item.read)}
        onPress={this.handleNotificationClick.bind(this)}
      />
    );
  }

  _renderSectionHeader({ section: { title } }) {
    return (
      <NotificationSection>
        <NotificationSectionTitle>{title}</NotificationSectionTitle>
      </NotificationSection>
    );
  }

  render() {
    const { navigation, notifications, read_notifications, notifications_loading } = this.props;
    let sections = [];
    if (notifications.length) {
      sections.push({
        title: "Notifications non-lues",
        data: notifications,
      });
    }

    if (read_notifications.length) {
      sections.push({
        title: "Notifications lues",
        data: read_notifications,
      });
    }
    return (
      <Container>
        <AppHeader navigation={navigation} showBack={true} showAvatar={false} />
        <Content
          keyExtractor={(item) => item.id.toString()}
          extraData={notifications}
          sections={sections}
          renderSectionHeader={this._renderSectionHeader}
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

const Content = styled.SectionList`
  padding: 10px;
`;

const NotificationSection = styled.View`
  margin: 10px 0px;
`;
const NotificationSectionTitle = styled.Text`
  color: #fff;
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
    read_notifications: getReadNotifications(state),
    notifications_loading: state.notification.notifications_loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchNotifications: (page) => dispatch(fetchNotifications(page)),
    markNotificationAsRead: (notification_id) => dispatch(markNotificationAsRead(notification_id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NotificationsScreen);
