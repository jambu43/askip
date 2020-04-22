import React from "react";
import styled from "styled-component";
import { connect } from "react-redux";
import PostList from "../components/askip/PostList";

class ProfileScreen extends React.Component {
  render() {
    const { user, isUserFetching, navigation } = this.props;
    return (
      <Container>
        <AppHeader />
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={isUserFetching}
              onRefresh={this._handleRefresh.bind(this)}
            />
          }
        >
          <Card>
            <Count>
              <Avatar source={{ uri: user.avatar }} />
              <Username>{user.name}</Username>
            </Count>
            <Information>
              <Publication>
                <Number>{user.posts_count}</Number>
                <Title>Publications</Title>
              </Publication>
              <Publication>
                <Number>{user.followers_count}</Number>
                <Title>Abonnés</Title>
              </Publication>
              <Publication>
                <Number>{user.followees_count}</Number>
                <Title>Abonnements</Title>
              </Publication>
            </Information>
          </Card>

          {user.posts.length ? (
            <View>
              <MagazineRecentlyRead>Mes publications</MagazineRecentlyRead>
              <PostList navigation={navigation} posts={user.posts} />
            </View>
          ) : null}
        </ScrollView>
      </Container>
    );
  }
}

const Container = styled.View`
  flex: 1;
  background-color: ${dark};
`;

const Card = styled.View`
  margin: 10px 10px;
  flex-direction: row;
`;
const Count = styled.View``;

const Username = styled.Text`
  color: #fff;
  text-align: center;
  margin-top: 10px;
  font-size: 13px;
  font-weight: 800;
  width: 100px;
`;

const Avatar = styled.Image`
  height: 90px;
  width: 90px;
  border-radius: 50px;
  background-color: #ffffff;
`;

const Information = styled.View`
  margin-top: 32px;
  flex-direction: row;
`;

const Publication = styled.View`
  margin-left: 10px;
`;

const Number = styled.Text`
  font-size: 15px;
  font-weight: 600;
  text-align: center;
  color: #ffffff;
`;

const Title = styled.Text`
  font-size: 13px;
  color: #ffffff;
  padding-left: 3px;
`;

const MagazineRecentlyRead = styled.Text`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
  margin-top: 10px;
  color: #fff;
  text-transform: uppercase;
  margin-left: 10px;
`;
