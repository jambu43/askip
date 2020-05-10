import React from "react";
import styled from "styled-components";

import { fetchUserPosts } from "../../store/actions/post";
import { getUsersPosts } from "../../store/selectors/post";
import { dark, darkLighten } from "../../config/variables";
import { connect } from "react-redux";
import { View } from "react-native";
import PostList from "../../components/askip/PostList";
import AppHeader from "../../components/generic/AppHeader";

class UserPublicationsScreen extends React.Component {
  componentDidMount() {
    const { user } = this.props;
    this.props.fetchUserPosts(user.id);
  }

  render() {
    const { user_posts, navigation } = this.props;
    return (
      <Container>
        <AppHeader showAvatar={false} showBack={true} navigation={navigation} />
        <PostList
          post_loading={false}
          onRefresh={() => {}}
          navigation={navigation}
          posts={user_posts}
        />
      </Container>
    );
  }
}

const Container = styled.View`
  flex: 1;
  background-color: ${darkLighten};
`;

const Title = styled.Text`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
  margin-top: 10px;
  color: #fff;
  text-transform: uppercase;
  margin-left: 10px;
`;

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.auth.user,
    user_posts: getUsersPosts(state, ownProps),
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserPosts: (user_id) => dispatch(fetchUserPosts(user_id)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(UserPublicationsScreen);
