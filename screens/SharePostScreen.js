import React from "react";
import styled from "styled-components";
import { AntDesign } from "@expo/vector-icons";
import { ActivityIndicator, Share } from "react-native";
import { getPostById, getUserPostById } from "../store/selectors/post";
import { darkLighten, dark } from "../config/variables";
import { connect } from "react-redux";
import PostCard from "../components/askip/PostCard";
import { sharePost } from "../store/actions/post";

class SharePostScreen extends React.Component {
  state = {
    post_creating: false,
    content: "",
  };

  handleInputChange(text) {
    this.setState({
      content: text,
    });
  }

  handleSubmit() {
    this.setState({
      post_creating: true,
    });

    const post_id = this.props.navigation.getParam("post_id");
    this.props
      .sharePost(post_id, {
        content: this.state.content,
      })
      .then(() => {
        this.setState({
          post_creating: false,
          content: "",
        });
        this.props.navigation.navigate("Explorer");
      })
      .catch(() => {
        this.setState({
          post_creating: false,
        });
      });
  }

  render() {
    const { post, userPost, navigation } = this.props;
    const { post_creating, content } = this.state;
    const postData = post ? post : userPost;
    let canSubmit = true;
    return (
      <Container>
        <StickyHeader>
          <TouchableIcon onPress={() => navigation.dismiss()}>
            <AntDesign name="close" size={24} color="#fff" />
          </TouchableIcon>
          <TouchableIcon
            disabled={!canSubmit || post_creating}
            onPress={this.handleSubmit.bind(this)}
          >
            {post_creating ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <AntDesign name="check" size={24} color="#fff" />
            )}
          </TouchableIcon>
        </StickyHeader>
        <Content>
          <PostInput
            onChangeText={this.handleInputChange.bind(this)}
            colorMode={false}
            multiline={true}
            autofocus={true}
            value={content}
            placeholder="Dites quelque chose sur cette publication"
          />
          <PostCard post={postData} />
        </Content>
      </Container>
    );
  }
}

const Container = styled.View`
  flex: 1;
  background-color: ${dark};
  margin-top: 24px;
`;

const Content = styled.View`
  padding: 0 15px;
`;

const StickyHeader = styled.View`
  width: 100%;
  background: ${darkLighten};
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  z-index: 10px;
  padding: 10px 15px;
`;

const PostInput = styled.TextInput`
  color: #fff;
  text-align: ${(props) => (props.colorMode ? "center" : "left")};
  font-size: ${(props) => (props.colorMode ? 23 : 14)}px;
  font-weight: ${(props) => (props.colorMode ? "bold" : 400)};
  padding: 15px 0px;
  line-height: 23px;
`;

const TouchableIcon = styled.TouchableOpacity``;

const mapStateToProps = (state, props) => {
  return {
    userPost: getUserPostById(state, props),
    post: getPostById(state, props),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    sharePost: (post_id, formData) => dispatch(sharePost(post_id, formData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SharePostScreen);
