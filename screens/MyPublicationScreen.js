import React from "react";
import styled from "styled-components";
import AppHeader from "../components/generic/AppHeader";
import { dark, darkLighten } from "../config/variables";
import PostList from "../components/askip/PostList";
import { fetchPosts, fetchPostUserId } from '../store/actions/post';
import { connect } from "react-redux";
import { getPosts } from "../store/selectors/post";
import { AntDesign } from "@expo/vector-icons";


class ShowMypublication extends React.Component {

  constructor(props) {
		super(props);
	}
	componentDidMount() {
		this.willFocusSubscription = this.props.navigation.addListener('willFocus', () => {
			this._fetchPostData();
		});
	}
	componentWillUnmount() {
		if (this.willFocusSubscription) {
			this.willFocusSubscription.remove();
		}
	}
	_fetchPostData() {
		this.props.fetchPostUserId();
	}

  render() {
    const { navigation, posts } = this.props;
    return (
      <Container>
         <StickyHeader onPress={() => navigation.goBack()}>
          <AntDesign name="close" size={24} color="#fff" />
        </StickyHeader>

        <AppHeader />
        <PostList navigation={navigation}  posts={posts}/>
      </Container>
    )
  }
}
const mapStateTopProps = (state) => {
	return {
		posts: getPosts(state),
		posts_loading: state.post.posts_loading
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		fetchPostUserId: () => dispatch(fetchPostUserId())
	};
};

export default connect(mapStateTopProps, mapDispatchToProps)(ShowMypublication);

const Container = styled.View`
	flex: 1;
	background-color: ${dark};
`;

const StickyHeader = styled.TouchableOpacity`
  position: absolute;
  width: 35px;
  height: 35px;
  background: ${darkLighten};
  top: 35px;
  left: 10px;
  justify-content: center;
  align-items: center;
  z-index: 10px;
  border-radius: 25px;
`;