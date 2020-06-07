import { NavigationActions } from "react-navigation";
import { Linking } from "react-native";

export const cutText = (text, length, more = "...") => {
  text = text ? text : "";
  return `${text.length > length ? text.slice(0, length) + more : text}`;
};

export const apiUrl = (pathname) => {
  return `http://askip.ngangeli.com/api/v1/${pathname}`;
};

export const assetsUrl = (pathname) => {
  if (pathname) {
    if (pathname.match("^file://")) return pathname;
    if (pathname.match("^http://") || pathname.match("^https://")) return pathname;
    return `http://askip.ngangeli.com/storage/${pathname}`;
  }

  return `http://askip.ngangeli.com/storage/`;
};

export const simplePlural = (count, plural, singular) => {
  return count > 1 ? plural : singular;
};
export const processPlaybackStatus = ({
  playableDurationMillis,
  durationMillis,
  positionMillis,
}) => {
  let bufferingProgress = durationMillis ? (playableDurationMillis * 100) / durationMillis : 0;
  let playingProgress = durationMillis ? (positionMillis * 100) / durationMillis : 0;
  let canGoForward = positionMillis < durationMillis;
  let canGoBackward = positionMillis > 0;
  return {
    bufferingProgress,
    playingProgress,
    canGoForward,
    canGoBackward,
  };
};

export const onLinkPress = (_, link) => {
  let parsedLink = link.replace(/^http:\/\//, "");
  parsedLink = parsedLink.replace(/^https:\/\//, "");
  parsedLink = `http://${parsedLink}`;
  Linking.openURL(parsedLink);
};

let _navigator;

function setTopLevelNavigator(navigatorRef) {
  _navigator = navigatorRef;
}

function navigate(routeName, params) {
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    })
  );
}

export default {
  navigate,
  setTopLevelNavigator,
};
