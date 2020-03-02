import React from "react";
import styled from "styled-components";

export default class AskipCard extends React.Component {
  render() {
    return (
      <Container>
        <AskpImage source={require("../../assets/mhd-en-prison.jpg")} />
        <Group>
          <AskipSocialInteraction>
            <IconGroup>
              <Icone source={require("../../assets/like-icone.png")} />
              <Title>Vrai</Title>
            </IconGroup>
            <IconGroup>
              <Icone source={require("../../assets/unlinke-icone.png")} />
              <Title>Faux</Title>
            </IconGroup>

            <IconGroup>
              <ShareTime>Il y a 18 minutes</ShareTime>
              <Icone source={require("../../assets/share-icone.png")} />
            </IconGroup>
          </AskipSocialInteraction>
        </Group>

          <CommentSection>
            <CommentInput
              value=""
              placeholder="Ajouter un commentaire ..."
              placeholderTextColor="#fff"
            />
          </CommentSection>
      </Container>
    );
  }
}

const Container = styled.View``;
const AskpImage = styled.Image`
  height: 250px;
  background-color: #ffffff;
  width: 100%;
`;
const Group = styled.View`
  justify-content: space-between;
`;
const AskipSocialInteraction = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
`;
const IconGroup = styled.TouchableOpacity`
  margin: 20px 10px;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
`;
const Icone = styled.Image`
  height: 27px;
  width: 27px;
  margin-right: 10px;
`;
const Title = styled.Text`
  color: #ffffff;
`;
const ShareTime = styled.Text`
  color: #ffffff;
  font-size: 11px;
`;
const AskipDescripton = styled.Text`
  color: #ffffff;
  font-size: 13px;
  margin-right: 10px;
  margin-left: 10px;
  text-align: justify;
`;
const NumberLike = styled.Text`
  color: #ffffff;
  margin-top: 5px;
`;
const CommentSection = styled.View`
  margin: 10px;
  flex-direction: row;
  flex-wrap: wrap;
`;
const AuthorComment = styled.Image`
  background-color: #ffffff;
  border-radius: 20px;
  height: 30px;
  width: 30px;
`;
const CommentInput = styled.TextInput`
  border-bottom-width: 1px;
  border-bottom-color: #ffffff;
  line-height: 20px;
  padding: 2.5px 5px;
  margin-bottom: 20px;
  border-radius: 5px;
  width: 100%;
`;