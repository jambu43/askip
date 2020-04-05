import React from "react";
import styled from "styled-components";
import { BackIcon } from "../components/Icons";
import { TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { getNewsArticles } from "../store/selectors/news";
import { fetchLatestArticles } from "../store/actions/articles";
import { dark } from "../config/variables";
import ArticleReleaseCard from "../components/article/ArticleReleaseCard";

class NewsExplorerScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
    };
  }
  renderHeader() {
    return (
      <ContentHeader>
        <ContentHeaderTitle>Actualités</ContentHeaderTitle>
        <ContentHeaderDescription>
          “L'Actualité, ça n'existe pas, ça ne veut rien dire. L'actualité, ce sont des gens. Des
          milliards de gens qui rient, qui pleurent, qui souffrent et qui tombent amoureux.”
        </ContentHeaderDescription>
      </ContentHeader>
    );
  }
  componentDidMount() {
    this.props.fetchLatestArticles(this.state.page);
  }

  _handleRefresh() {
    this.setState(
      (prevState, nextProps) => ({
        page: 1,
      }),
      () => {
        this.props.fetchLatestArticles(this.state.page);
      }
    );
  }

  _handleLoadMore = () => {
    this.setState(
      (prevState, nextProps) => ({
        page: prevState.page + 1,
      }),
      () => {
        this.props.fetchLatestArticles(this.state.page);
      }
    );
  };

  renderNews({ item }) {
    const { navigation } = this.props;
    return <ArticleReleaseCard size="lg" navigation={navigation} article={item} />;
  }
  render() {
    const { navigation, articles_loading, articles } = this.props;
    return (
      <Container>
        <Header>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <BackIcon fill="#fff" size={24} />
          </TouchableOpacity>
        </Header>
        <Content
          keyExtractor={(item) => item.id.toString()}
          extraData={articles}
          data={articles}
          refreshing={articles_loading}
          onRefresh={this._handleRefresh.bind(this)}
          ListHeaderComponent={this.renderHeader.bind(this)}
          renderItem={this.renderNews.bind(this)}
          showsVerticalScrollIndicator={false}
          numColumns={1}
          onEndReached={this._handleLoadMore.bind(this)}
          onEndReachedThreshold={0.5}
          initialNumToRender={10}
        />
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

const Content = styled.FlatList``;

const ContentHeader = styled.View`
  width: 100%;
  margin-bottom: 25px;
`;
const ContentHeaderTitle = styled.Text`
  color: #fff;
  font-size: 25px;
  font-weight: bold;
  margin-bottom: 10px;
`;
const ContentHeaderDescription = styled.Text`
  color: #fff;
  font-size: 18px;
`;

const mapStateToProps = (state) => {
  return {
    articles: getNewsArticles(state),
    articles_loading: state.article.article_list_loading,
  };
};

const matDispatchToProps = (dispatch) => {
  return {
    fetchLatestArticles: (page) => dispatch(fetchLatestArticles(page)),
  };
};
export default connect(mapStateToProps, matDispatchToProps)(NewsExplorerScreen);
