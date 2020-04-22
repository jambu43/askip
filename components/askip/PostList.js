import React from "react";
import styled from "styled-components";
import PostCard from "./PostCard";
import { ScrollView } from "react-native-gesture-handler";

const PostList = ({ posts, navigation }) => {
  return (
    <Container>
      <Header />
      <Content>
        <ScrollView showsVerticalScrollIndicator={false}>
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
