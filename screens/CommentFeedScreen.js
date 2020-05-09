import React from "react";
import styled from "styled-components";
import { dark } from "../config/variables";
import { connect } from "react-redux";
import { TouchableOpacity, View } from "react-native";
import { BackIcon } from "../components/Icons";
import { getCommentById } from "../store/selectors/comment";
import CommentItem from "../components/askip/CommentItem";
import PostCommentInput from "../components/askip/PostCommentInput";

class CommentFeedScreen extends React.Component {
  state = {
    content: "",
  };

  _handleRefresh() {}

  renderHeader() {
    const { navigation, comment } = this.props;
    return <CommentItem comment={comment} navigation={navigation} showFeedBackButton={false} />;
  }

  renderComment() {}

  _handleLoadMore() {}

  handleCommentChange(text) {
    this.setState({
      content: text,
    });
  }

  handleCommentSubmit() {
    let post_id = this.props.navigation.getParam("comment_id");
    this.props.addComment(post_id, {
      content: this.state.content,
    });

    this.setState({
      content: "",
    });
  }

  render() {
    const { navigation, comment } = this.props;
    const { content } = this.state;
    return (
      <Container behavior="padding">
        <Header>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <BackIcon fill="#fff" size={24} />
          </TouchableOpacity>
          <HeaderTitle>Réponses</HeaderTitle>
        </Header>
        <Content
          keyExtractor={(item) => item.id.toString()}
          extraData={[]}
          data={[]}
          refreshing={false}
          onRefresh={this._handleRefresh.bind(this)}
          ListHeaderComponent={this.renderHeader.bind(this)}
          renderItem={this.renderComment.bind(this)}
          showsVerticalScrollIndicator={false}
          onEndReached={this._handleLoadMore.bind(this)}
          onEndReachedThreshold={0.5}
          initialNumToRender={10}
        />
        <PostCommentInput
          content={content}
          onSubmit={this.handleCommentSubmit.bind(this)}
          onChange={this.handleCommentChange.bind(this)}
        />
        <View style={{ height: 0 }} />
      </Container>
    );
  }
}

const Container = styled.KeyboardAvoidingView`
  flex: 1;
  background-color: ${dark};
  padding: 10px 0px 0px;
  position: relative;
  flex-grow: 1;
`;

const Header = styled.View`
  margin-top: 15px;
  padding: 7.5px 0px;
  flex-direction: row;
  align-items: center;
`;
const HeaderTitle = styled.Text`
  color: #fff;
  font-size: 16px;
  text-align: center;
  flex: 1;
  font-weight: bold;
`;

const Content = styled.FlatList``;

const mapStateToProps = (state, props) => {
  return {
    comment: getCommentById(state, props),
  };
};

export default connect(mapStateToProps)(CommentFeedScreen);
