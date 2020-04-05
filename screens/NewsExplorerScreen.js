import React from "react";
import styled from "styled-components";
import { BackIcon } from "../components/Icons";
import { TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { getNewsArticles } from "../store/selectors/news";
import { dark } from "../config/variables";

class NewsExplorerScreen extends React.Component {
  render() {
    const { navigation } = this.props;
    return (
      <Container>
        <Header>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <BackIcon fill="#fff" size={24} />
          </TouchableOpacity>
        </Header>
      </Container>
    );
  }
}

const Container = styled.View`
  flex: 1;
  background-color: ${dark};
  position: relative;
  padding: 15px;
`;

const Header = styled.View`
  margin-top: 24px;
  margin-bottom: 15px;
  flex-direction: row;
  align-items: center;
`;

const mapStateToProps = (state) => {
  return {
    articles: getNewsArticles(state),
    articles_loading: state.article.article_list_loading,
  };
};

const matDispatchToProps = (dispatch) => {
  return {};
};
export default connect(mapStateToProps, matDispatchToProps)(NewsExplorerScreen);
