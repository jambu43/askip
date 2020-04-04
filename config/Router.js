import React from "react";
import {
  createAppContainer,
  createStackNavigator,
  createBottomTabNavigator,
} from "react-navigation";

import LoginScreen from "../screens/LoginScreen";
import CreatePostScreen from "../screens/CreatePostScreen";
import MagazineScreen from "../screens/MagazineScreen";
import ExplorerScreen from "../screens/ExplorerScreen";
import Profile from "../screens/Profile";
import ArticleScreen from "../screens/ArticleScreen";
import HomeScreen from "../screens/HomeScreen";
import PodcastScreen from "../screens/PodcastScreen";
import PodcastsScreen from "../screens/PodcastsScreen";
import ArtistScreen from "../screens/ArtistScreen";
import NewsScreen from "../screens/NewsScreen";
import NotificationsScreen from "../screens/NotificationsScreen";
import MyPublicationScreen from "../screens/MyPublicationScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import UserAvatar from "../components/generic/UserAvatar";
import { NotificationIcon, SearchIcon, HomeIcon } from "../components/Icons";

import { dark } from "./variables";
import MagazineRecentlyRead from "../screens/MagazineRecentlyRead";
import AddPostIcon from "../components/generic/AddPostIcon";
import MagazinesScreen from "../screens/MagazinesScreen";

const BottomTransition = (index, position, height) => {
  const sceneRange = [index - 1, index, index + 1];
  const outPutHeight = [height, 0, 0];
  const transition = position.interpolate({
    inputRange: sceneRange,
    outputRange: outPutHeight,
  });

  return {
    transform: [
      {
        translateY: transition,
      },
    ],
  };
};

const SlideTransition = (index, position, width) => {
  const sceneRange = [index - 1, index, index + 1];
  const outPutWidth = [width, 0, 0];
  const transition = position.interpolate({
    inputRange: sceneRange,
    outputRange: outPutWidth,
  });

  return {
    transform: [
      {
        translateX: transition,
      },
    ],
  };
};

const configNavigation = () => {
  return {
    screenInterpolator: (screenProps) => {
      const position = screenProps.position;
      const scene = screenProps.scene;
      const index = scene.index;
      const height = screenProps.layout.initHeight;

      return BottomTransition(index, position, height);
    },
  };
};

const configSlideNavigation = () => {
  return {
    screenInterpolator: (screenProps) => {
      const position = screenProps.position;
      const scene = screenProps.scene;
      const index = scene.index;
      const width = screenProps.layout.initWidth;

      return SlideTransition(index, position, width);
    },
  };
};

const HomeStack = createStackNavigator(
  {
    Article: {
      path: "article",
      screen: ArticleScreen,
    },
    Magazine: {
      path: "magazine/:magazine_id",
      screen: MagazineScreen,
    },
    Magazines: {
      path: "magazines",
      screen: MagazinesScreen,
    },
    News: {
      path: "news/:article_id",
      screen: NewsScreen,
    },
    MagazineRecentlyRead: {
      path: "magazine/:magazine_id",
      screen: MagazineRecentlyRead,
    },
    Home: {
      path: "home",
      screen: HomeScreen,
    },
    Podcasts: {
      path: "podcasts",
      screen: PodcastsScreen,
    },
    Podcast: {
      path: "podcast/:podcast_id",
      screen: PodcastScreen,
    },
    ShowMypublication: {
      path: "post/:user_id",
      screen: MyPublicationScreen,
    },
  },
  {
    initialRouteName: "Home",
    headerMode: "none",
    transitionConfig: configNavigation,
  }
);

HomeStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible,
  };
};

const HomeTabNavigator = createBottomTabNavigator(
  {
    Home: HomeStack,
    Explorer: ExplorerScreen,
    CreatePost: {
      screen: CreatePostScreen,
      label: "Askip",
    },
    Notifications: NotificationsScreen,
    Profile: {
      screen: Profile,
      label: "Moi",
    },
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        switch (routeName) {
          case "Profile":
            return <UserAvatar />;
          case "Explorer":
            return <SearchIcon fill={tintColor} />;
          case "Home":
            return <HomeIcon fill={tintColor} />;
          case "Notifications":
            return <NotificationIcon fill={tintColor} />;
          case "CreatePost":
            return <AddPostIcon />;
        }
      },
    }),
    tabBarOptions: {
      activeTintColor: "#fff",
      inactiveTintColor: "#92929d",
      showLabel: false,
      style: {
        backgroundColor: dark,
      },
    },
    transitionConfig: configSlideNavigation,
  }
);

const AppNavigator = createStackNavigator(
  {
    Login: {
      path: "login",
      screen: LoginScreen,
    },
    Artist: {
      path: "artiste",
      screen: ArtistScreen,
    },
    Welcome: {
      path: "welcome",
      screen: WelcomeScreen,
    },
    HomeStack: HomeTabNavigator,
  },
  {
    initialRouteName: "Login",
    headerMode: "none",
  }
);

const Rooter = createAppContainer(AppNavigator);
export default Rooter;
