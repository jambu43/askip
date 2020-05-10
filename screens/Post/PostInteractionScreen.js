import React from "react";
import styled from "styled-components";
import AppHeader from "../../components/generic/AppHeader";
import { dark, darkLighten } from "../../config/variables";
import { connect } from "react-redux";
import { fetchPostLikers, fetchPostHaters } from "../../store/actions/post";
import UserCardHorizontal from "../../components/user/UserCardHorizontal";
import orderBy from "lodash/orderBy";

const likeIconActive = require("../../assets/like-icon-active.png");
const likeIcon = require("../../assets/like-icon.png");
const unLikeIcon = require("../../assets/un-like-icon.png");
const unLikeIconActive = require("../../assets/un-like-icon-active.png");

class PostInteractionScreen extends React.Component {
  state = {
    page: 1,
    post_haters: {},
    post_haters_loading: false,
    post_likers: {},
    post_likers_loading: false,
    showLikers: true,
  };

  componentDidMount() {
    this.setState({
      showLikers: this.props.navigation.getParam("showLikers"),
    });
    this.fetchPostLikers();
    this.fetchPostHaters();
  }

  _handleRefresh() {
    this.setState({
      page: 1,
    });
    this.fetchPostLikers();
  }

  _handleLoadMore = () => {
    this.setState(
      (prevState, nextProps) => ({
        page: prevState.page + 1,
      }),
      () => {
        this.fetchPostLikers(this.state.page);
      }
    );
  };

  toArray(map) {
    let mapValues = Object.values(map);
    return orderBy(mapValues, "name", "asc");
  }

  fetchPostLikers() {
    this.setState({
      post_likers_loading: true,
    });

    const post_id = this.props.navigation.getParam("post_id");
    this.props
      .fetchPostLikers(post_id, this.state.page)
      .then((data) => {
        data.forEach((item) => {
          this.setState({
            post_likers: {
              ...this.state.post_likers,
              [item.id]: item,
            },
          });
        });
        this.setState({
          post_likers_loading: false,
        });
      })
      .catch(() => {
        this.setState({
          post_likers_loading: false,
        });
      });
  }

  toggleIsLikers() {
    this.setState({
      showLikers: !this.state.showLikers,
    });
  }
  fetchPostHaters() {
    const post_id = this.props.navigation.getParam("post_id");
    this.setState({
      post_haters_loading: true,
    });
    this.props
      .fetchPostHaters(post_id, this.state.page)
      .then((data) => {
        console.log(data);
        data.forEach((item) => {
          this.setState({
            post_haters: {
              ...this.state.post_haters,
              [item.id]: item,
            },
          });
        });
        this.setState({
          post_haters_loading: false,
        });
      })
      .catch(() => {
        this.setState({
          post_haters_loading: false,
        });
      });
  }

  _renderFollower({ item }) {
    return <UserCardHorizontal user={item} navigation={this.props.navigation} />;
  }

  render() {
    const { navigation } = this.props;
    const {
      post_likers_loading,
      post_haters_loading,
      post_likers,
      post_haters,
      showLikers,
    } = this.state;
    let likers = this.toArray(post_likers);
    let haters = this.toArray(post_haters);
    let users = showLikers ? likers : haters;
    let loading = showLikers ? post_likers_loading : post_haters_loading;
    return (
      <Container>
        <AppHeader navigation={navigation} showBack={true} showAvatar={false} />
        <Content
          keyExtractor={(item) => item.id.toString()}
          extraData={users}
          data={users}
          refreshing={loading}
          onRefresh={this._handleRefresh.bind(this)}
          renderItem={this._renderFollower.bind(this)}
          showsVerticalScrollIndicator={true}
          numColumns={1}
          onEndReached={this._handleLoadMore.bind(this)}
          onEndReachedThreshold={1}
          initialNumToRender={10}
        />
        <StickyFooter>
          <IconGroup onPress={() => this.toggleIsLikers()}>
            <InteractionIcon source={showLikers ? likeIconActive : likeIcon} />
            <SocialInteractionTitle active={showLikers}>C'est vrai</SocialInteractionTitle>
          </IconGroup>
          <IconGroup onPress={() => this.toggleIsLikers()}>
            <InteractionIcon source={!showLikers ? unLikeIconActive : unLikeIcon} />
            <SocialInteractionTitle active={!showLikers}>C'est faux</SocialInteractionTitle>
          </IconGroup>
        </StickyFooter>
      </Container>
    );
  }
}

const Container = styled.View`
  flex: 1;
  background: ${dark};
`;
const Content = styled.FlatList`
  padding: 0px 10px 30px 10px;
`;

const StickyFooter = styled.View`
  background: ${darkLighten};
  align-items: center;
  flex-direction: row;
  justify-content: center;
  z-index: 10px;
  width: 100%;
  padding: 5px;
`;

const IconGroup = styled.TouchableOpacity`
  margin: 10px;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
`;
const InteractionIcon = styled.Image`
  height: 20px;
  width: 20px;
  margin-right: 10px;
`;
const SocialInteractionTitle = styled.Text`
  color: ${(props) => (props.active ? "#2d88ff" : "#ffffff")};
  font-weight: ${(props) => (props.active ? "bold" : "normal")};
`;

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPostLikers: (post_id, page) => dispatch(fetchPostLikers(post_id, page)),
    fetchPostHaters: (post_id, page) => dispatch(fetchPostHaters(post_id, page)),
  };
};

export default connect(() => {
  return {};
}, mapDispatchToProps)(PostInteractionScreen);
