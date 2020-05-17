import React from "react";
import styled from "styled-components";
import { dark } from "../config/variables";
import { connect } from "react-redux";
import { TouchableOpacity, View } from "react-native";
import { BackIcon } from "../components/Icons";
import { getCommentById, getCommentFeed } from "../store/selectors/comment";
import CommentItem from "../components/askip/CommentItem";
import PostCommentInput from "../components/askip/PostCommentInput";
import { addComment, fetchCommentFeed } from "../store/actions/comments";

class CommentFeedScreen extends React.Component {
  state = {
    content: "",
    page: 1,
    commenting: false,
  };

  renderHeader() {
    const { navigation, comment } = this.props;
    return <CommentItem comment={comment} navigation={navigation} showFeedBackButton={false} />;
  }

  renderComment({ item }) {
    const { navigation } = this.props;
    return (
      <CommentItem
        setBack={true}
        comment={item}
        navigation={navigation}
        showFeedBackButton={false}
      />
    );
  }

  componentDidMount() {
    this._handleRefresh();
  }
  _handleRefresh() {
    let comment_id = this.props.navigation.getParam("comment_id");
    this.props.fetchCommentFeed(comment_id, 1);
  }

  _handleLoadMore() {
    let comment_id = this.props.navigation.getParam("comment_id");
    this.setState(
      (prevState, nextProps) => ({
        page: prevState.page + 1,
      }),
      () => {
        this.props.fetchCommentFeed(comment_id, this.state.page);
      }
    );
  }

  handleCommentChange(text) {
    this.setState({
      content: text,
    });
  }

  handleCommentSubmit() {
    this.setState({
      commenting: true,
    });
    let comment_id = this.props.navigation.getParam("comment_id");
    let post_id = this.props.navigation.getParam("post_id");
    this.props
      .addComment(post_id, {
        content: this.state.content,
        comment_id,
      })
      .then(() => {
        this.setState({
          content: "",
          commenting: false,
        });
      })
      .catch(() => {
        this.setState({
          commenting: false,
        });
      });
  }

  render() {
    const { navigation, comments } = this.props;
    const { content, commenting } = this.state;
    return (
      <Container>
        <Header>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <BackIcon fill="#fff" size={24} />
          </TouchableOpacity>
          <HeaderTitle>Réponses</HeaderTitle>
        </Header>
        <Content
          keyExtractor={(item) => item.id.toString()}
          extraData={comments}
          data={comments}
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
          submitting={commenting}
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

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCommentFeed: (comment_id, page) => dispatch(fetchCommentFeed(comment_id, page)),
    addComment: (post_id, comment) => dispatch(addComment(post_id, comment)),
  };
};

const mapStateToProps = (state, props) => {
  return {
    comment: getCommentById(state, props),
    comments: getCommentFeed(state, props),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentFeedScreen);
