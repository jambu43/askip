import React from "react";
import styled from "styled-components";
import { dark } from "../config/variables";
import { connect } from "react-redux";
import AppHeader from "../components/generic/AppHeader";
import { fetchPodcastChannels } from "../store/actions/podcasts";
import { getPodcastChannels } from "../store/selectors/user";
import UserCard from "../components/user/UserCard";
import PodcastChannelCard from "../components/podcast/PodcastChannelCard";
import { TouchableOpacity } from "react-native";
import { BackIcon } from "../components/Icons";

class PodcastsScreen extends React.Component {
  state = {
    page: 1,
  };

  componentDidMount() {
    this._handleRefresh();
  }

  _handleRefresh() {
    this.setState(
      (prevState, nextProps) => ({
        page: 1,
      }),
      () => {
        this.props.fetchPodcastChannels(this.state.page);
      }
    );
  }

  _handleLoadMore = () => {
    this.setState(
      (prevState, nextProps) => ({
        page: prevState.page + 1,
      }),
      () => {
        this.props.fetchPodcastChannels(this.state.page);
      }
    );
  };

  renderUser({ item, index }) {
    return <PodcastChannelCard user={item} navigation={this.props.navigation} />;
  }

  renderHeader() {
    return (
      <ContentHeader>
        <ContentHeaderTitle>Podcasts</ContentHeaderTitle>
        <ContentHeaderDescription>
          Assurer au lecteur des informations claires, vraies et, dans toute la mesure du possible,
          rapides et complètes.
        </ContentHeaderDescription>
      </ContentHeader>
    );
  }

  render() {
    const { channels, usersLoading } = this.props;
    return (
      <Container>
        <Header>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <BackIcon fill="#fff" size={24} />
          </TouchableOpacity>
        </Header>
        <Content
          keyExtractor={(item) => item.id.toString()}
          extraData={channels}
          data={channels}
          refreshing={usersLoading}
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
  padding: 10px 15px;
`;

const Content = styled.FlatList``;

const Header = styled.View`
  margin-top: 24px;
  margin-bottom: 15px;
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
  return {
    channels: getPodcastChannels(state),
    usersLoading: state.user.usersLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPodcastChannels: (page) => dispatch(fetchPodcastChannels(page)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(PodcastsScreen);
