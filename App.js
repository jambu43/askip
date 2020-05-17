import React from "react";
import * as Analytics from "expo-firebase-analytics";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import Rooter from "./config/Router";
import moment from "./config/moment";
import { store, persistor } from "./store/createStore";
console.disableYellowBox = true;

// Gets the current screen from navigation state
const getActiveRouteName = (navigationState) => {
  if (!navigationState) {
    return null;
  }
  const route = navigationState.routes[navigationState.index];
  // dive into nested navigators
  if (route.routes) {
    return getActiveRouteName(route);
  }
  return route.routeName;
};

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Rooter
          onNavigationStateChange={(prevState, currentState, action) => {
            const currentScreen = getActiveRouteName(currentState);
            const prevScreen = getActiveRouteName(prevState);
            if (prevScreen !== currentScreen) {
              console.log(currentScreen);
              Analytics.setCurrentScreen(currentScreen, currentScreen);
              Analytics.logEvent("share", {
                contentType: "text",
                itemId: "Expo rocks!",
                method: "facebook",
              });
            }
          }}
        />
      </PersistGate>
    </Provider>
  );
}
