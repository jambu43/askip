import React from "react";
import styled from "styled-components";

export default class PlainTextPost extends React.Component {
  render() {
    const { post } = this.props;
    let postColor = !post.image_path ? post.post_color : "transparent";
    let isPlainTextPost = !post.image_path;
    return (
      <Container>
        <PostContentWrapper isPlainTextPost={isPlainTextPost} postColor={postColor}>
          <PostContent isPlainTextPost={isPlainTextPost}>{post.content}</PostContent>
        </PostContentWrapper>
      </Container>
    );
  }
}

const Container = styled.View``;
const PostContentWrapper = styled.View`
  height: ${props => (props.isPlainTextPost ? "220px" : "auto")};
  background: ${props => props.postColor};
  justify-content: center;
  padding: 5px 15px;
`;
const PostContent = styled.Text`
  font-weight: ${props => (props.isPlainTextPost ? "bold" : 100)};
  color: #ffffff;
  font-size: ${props => (props.isPlainTextPost ? 20 : 14)}px;
  text-align: ${props => (props.isPlainTextPost ? "center" : "left")};
`;
