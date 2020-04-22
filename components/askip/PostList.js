import React from "react";
import styled from "styled-components";
import PostCard from "./PostCard";
import { ScrollView } from "react-native-gesture-handler";
import { RefreshControl } from "react-native";

const PostList = ({ posts, post_loading, navigation, onRefresh }) => {
  return (
    <Container>
      <Header />
      <Content>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={post_loading} onRefresh={() => onRefresh()} />
          }
          showsVerticalScrollIndicator={false}
        >
          {posts.map((post) => (
            <PostCard post={post} navigation={navigation} key={post.id} />
          ))}
        </ScrollView>
      </Content>
    </Container>
  );
};

export default PostList;

const Container = styled.View``;
const Header = styled.View``;
const Content = styled.View``;
