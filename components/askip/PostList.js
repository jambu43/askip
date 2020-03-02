import React from "react";
import styled from "styled-components";
import PostCard from "./PostCard";
import { TouchableOpacity, ScrollView } from "react-native-gesture-handler";
import PlainTextPost from "./PlainTextPost";

const PostList = ({ posts }) => {
  return (
    <Container>
      <Header />
      <Content>
        <ScrollView showsVerticalScrollIndicator={false}>
          {posts.map(post => (
            <PostCard post={post} key={post.id} />
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
