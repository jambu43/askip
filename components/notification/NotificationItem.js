import React from "react";
import styled from "styled-components";
import HTML from "react-native-render-html";
import { darkLighten } from "../../config/variables";
import moment from "moment";

export default ({ notification, onPress, read }) => {
  return (
    <Container onPress={() => onPress(notification)} read={read}>
      <HTML
        html={notificationText(notification)}
        tagsStyles={{
          p: { color: "#fff", marginBottom: 5 },
          b: { fontWeight: "bold", color: "#fff" },
        }}
      ></HTML>
      <NotificationDate>{moment(notification.created_at).fromNow()}</NotificationDate>
    </Container>
  );
};

const Container = styled.TouchableOpacity`
  background-color: ${darkLighten};
  padding: 7.5px;
  border-radius: 15px;
  margin-bottom: 5px;
  opacity: ${(props) => (props.read ? 0.5 : 1)};
`;
const Title = styled.Text``;
const Text = styled.Text`
  color: #fff;
`;

const NotificationDate = styled.Text`
  color: #fff;
  font-size: 10px;
`;

const notificationText = ({ type, sourceUser }) => {
  if (!sourceUser) return "";
  switch (type) {
    case "FOLLOW":
      return `<p><b>${sourceUser.name}</b> s'est abonné à votre profil.</p>`;
    case "POST_COMMENT":
      return `<p><b>${sourceUser.name}</b> a commenté votre publication.</p>`;
    case "PODCAST_COMMENT":
      return `<p><b>${sourceUser.name}</b> a commenté votre podcast.</p>`;
    case "POST_SHARE":
      return `<p><b>${sourceUser.name}</b> a partagé votre publication sur sa fil d'actualité.</p>`;
  }
};
