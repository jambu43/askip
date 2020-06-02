import React from "react";
import * as Analytics from "expo-firebase-analytics";
import { Vibration, Platform } from "react-native";
import { Notifications } from "expo";
import * as Permissions from "expo-permissions";
import Constants from "expo-constants";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import Rooter from "./config/Router";
import moment from "./config/moment";
import { store, persistor } from "./store/createStore";
import { updateUserToken } from "./store/actions/users";
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

export default class App extends React.Component {
  registerForPushNotificationsAsync = async () => {
    if (Constants.isDevice) {
      const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      token = await Notifications.getExpoPushTokenAsync();
      store.dispatch(updateUserToken(token));
    } else {
      alert("Must use physical device for Push Notifications");
    }

    if (Platform.OS === "android") {
      Notifications.createChannelAndroidAsync("default", {
        name: "default",
        sound: true,
        priority: "max",
        vibrate: [0, 250, 250, 250],
      });
    }
  };

  componentDidMount() {
    this.registerForPushNotificationsAsync();

    // Handle notifications that are received or selected while the app
    // is open. If the app was closed and then opened by tapping the
    // notification (rather than just tapping the app icon to open it),
    // this function will fire on the next tick after the app starts
    // with the notification data.
    this._notificationSubscription = Notifications.addListener(this._handleNotification);
  }

  _handleNotification = (notification) => {
    Vibration.vibrate();
    console.log(notification);
  };

  render() {
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
}
