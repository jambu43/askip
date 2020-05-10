import React from "react";
import styled from "styled-components";
import { darkLighten } from "../../config/variables";

const likeIcon = require("../../assets/like-icon.png");
const unLikeIcon = require("../../assets/un-like-icon.png");

export default ({ post, onLikeGroupClick, likeGroupClickEnabled = false }) => {
  return (
    <Container>
      <StatGroupWrapper disabled={!likeGroupClickEnabled} onPress={onLikeGroupClick}>
        {post.post_confirmations ? (
          <StatWrapper>
            <StatIcon source={likeIcon} />
            <StatTitle>{post.post_confirmations}</StatTitle>
          </StatWrapper>
        ) : null}
        {post.post_invalidations ? (
          <StatWrapper>
            <StatIcon source={unLikeIcon} />
            <StatTitle>{post.post_invalidations}</StatTitle>
          </StatWrapper>
        ) : null}
      </StatGroupWrapper>
      <StatGroupWrapper disabled={true}>
        {post.comments_count ? (
          <StatWrapper>
            <StatTitle>{post.comments_count} commentaires</StatTitle>
          </StatWrapper>
        ) : null}

        {post.post_shares_count ? (
          <StatWrapper>
            <StatTitle>{post.post_shares_count} partages</StatTitle>
          </StatWrapper>
        ) : null}
      </StatGroupWrapper>
    </Container>
  );
};

const Container = styled.View`
  flex-direction: row;
  margin: 0 15px;
  border-bottom-color: ${darkLighten};
  border-bottom-width: 1px;
  padding: 15px 0;
  justify-content: space-between;
`;

const StatGroupWrapper = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;

const StatWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  margin-right: 5px;
`;
const StatTitle = styled.Text`
  font-size: 14px;
  color: #fff;
  margin-left: 5px;
`;
const StatIcon = styled.Image`
  width: 18px;
  height: 18px;
`;
