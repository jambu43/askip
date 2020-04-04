import React from "react";
import styled from "styled-components";
import { dark } from "../config/variables";
import { connect } from "react-redux";
import AppHeader from "../components/generic/AppHeader";
import { fetchMagazineReleases } from "../store/actions/magazines";
import { getMagazinesReleases } from "../store/selectors/magazine";
import MagazineReleaseCard from "../components/magazine/MagazineReleaseCard";
import { ScrollView } from "react-native";

class MagazinesScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
    };
  }

  componentDidMount() {
    this.props.fetchMagazineReleases(this.state.page);
  }

  render() {
    const { magazines, navigation } = this.props;
    return (
      <Container>
        <AppHeader />
        <Content
          contentContainerStyle={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          {magazines.map((magazine) => (
            <MagazineReleaseCard
              size="lg"
              navigation={navigation}
              magazine={magazine}
              key={magazine.id}
            />
          ))}
        </Content>
      </Container>
    );
  }
}

const Container = styled.View`
  background: ${dark};
  flex: 1;
`;

const Content = styled.ScrollView`
  padding: 15px;
`;

const mapStateToProps = (state) => {
  return {
    magazines: getMagazinesReleases(state),
  };
};
const mapPropsToDispatch = (dispatch) => {
  return {
    fetchMagazineReleases: (page) => dispatch(fetchMagazineReleases(page)),
  };
};
export default connect(mapStateToProps, mapPropsToDispatch)(MagazinesScreen);
