import React from "react";
import styled from "styled-components";
import AppHeader from "../../components/generic/AppHeader";
import { dark } from "../../config/variables";
import { connect } from "react-redux";
import { getUserFollowers } from "../../store/selectors/user";
import { fetchUserFollowers } from "../../store/actions/users";

class UserFollowersScreen extends React.Component {
  state = {
    page: 1,
  };

  componentDidMount() {
    this.props.fetchUserFollowers(1);
  }

  render() {
    const { navigation } = this.props;
    return (
      <Container>
        <AppHeader navigation={navigation} showBack={true} showAvatar={false} />
        <Content>
          <Text>Vous n'avez auccune notification pour le moment.</Text>
        </Content>
      </Container>
    );
  }
}

const Container = styled.View`
  flex: 1;
  background: ${dark};
`;

const Content = styled.View`
  flex: 1;
  justify-content: center;
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
