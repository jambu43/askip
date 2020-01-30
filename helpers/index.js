import { NavigationActions } from "react-navigation";

export const cutText = (text, length, more = "...") => {
  return `${text.length > length ? text.slice(0, length) + more : text}`;
};

export const apiUrl = pathname => {
  return `http://askip.ngangeli.com/api/v1/${pathname}`;
};

export const assetsUrl = pathname => {
  return `http://askip.ngangeli.com/storage/${pathname}`;
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
