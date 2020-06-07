import React from "react";
import styled from "styled-components";
import HTML from "react-native-render-html";
import { Linking } from "react-native";

const onLinkPress = (_, link) => {
  let parsedLink = link.replace(/^http:\/\//, "");
  parsedLink = parsedLink.replace(/^https:\/\//, "");
  parsedLink = `http://${parsedLink}`;
  Linking.openURL(parsedLink);
};
export default class PlainTextPost extends React.Component {
  render() {
    const { post } = this.props;
    let postColor = !post.image_path && post.post_color ? post.post_color : "transparent";
    let isPlainTextPost = !post.image_path && post.content.length < 144 && !post.sourcePost;
    if (!isPlainTextPost) {
      postColor = "transparent";
    }
    let parsedContent = post.content.replace("\n", "<br>");
    parsedContent = !parsedContent.match(/^<p>/) ? `<p>${parsedContent}</p>` : parsedContent;
    let styles = isPlainTextPost ? plainTextStyles : nonPlainTextStyles;
    return (
      <Container>
        <PostContentWrapper isPlainTextPost={isPlainTextPost} postColor={postColor}>
          <HTML onLinkPress={onLinkPress} html={parsedContent} tagsStyles={styles}></HTML>
        </PostContentWrapper>
      </Container>
    );
  }
}

let plainTextStyles = {
  p: {
    textAlign: "center",
    color: "#fff",
    fontSize: 20,
  },
  a: {
    fontWeight: "bold",
    color: "#fff",
    fontSize: 20,
    lineHeight: 20,
    borderRadius: 10,
  },
};

let nonPlainTextStyles = {
  p: {
    fontSize: 14,
    color: "#fff",
  },
  a: {
    fontWeight: "bold",
    color: "#fff",
  },
};

const Container = styled.View``;
const PostContentWrapper = styled.View`
  height: ${(props) => (props.isPlainTextPost ? "220px" : "auto")};
  background: ${(props) => props.postColor};
  justify-content: center;
  padding: 0 15px;
  margin-bottom: 10px;
`;
const PostContent = styled.Text`
  font-weight: ${(props) => (props.isPlainTextPost ? "bold" : 100)};
  color: #ffffff;
  font-size: ${(props) => (props.isPlainTextPost ? 20 : 14)}px;
  text-align: ${(props) => (props.isPlainTextPost ? "center" : "left")};
`;
