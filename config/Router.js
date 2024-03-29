import React from "react";
import {
  createAppContainer,
  createStackNavigator,
  createBottomTabNavigator,
} from "react-navigation";

import { Entypo } from "@expo/vector-icons";

import LoginScreen from "../screens/LoginScreen";
import CreatePostScreen from "../screens/CreatePostScreen";
import TrendsScreen from "../screens/TrendsScreen";
import PostScreen from "../screens/PostScreen";
import SharePostScreen from "../screens/SharePostScreen";
import CommentFeedScreen from "../screens/CommentFeedScreen";
import MagazineScreen from "../screens/MagazineScreen";
import ExplorerScreen from "../screens/ExplorerScreen";
import DashboardScreen from "../screens/DashboardScreen";
import ArticleScreen from "../screens/ArticleScreen";
import HomeScreen from "../screens/HomeScreen";
import PodcastEpisodeScreen from "../screens/PodcastEpisodeScreen";
import PodcastScreen from "../screens/PodcastScreen";
import PodcastsScreen from "../screens/PodcastsScreen";
import NewsScreen from "../screens/NewsScreen";
import ProfileScreen from "../screens/ProfileScreen";
import NotificationsScreen from "../screens/Dashboard/NotificationsScreen";
import UserAvatar from "../components/generic/UserAvatar";
import { NotificationIcon, SearchIcon, HomeIcon } from "../components/Icons";

import { dark } from "./variables";
import MagazineRecentlyRead from "../screens/MagazineRecentlyRead";
import MagazinesScreen from "../screens/MagazinesScreen";
import NewsExplorerScreen from "../screens/NewsExplorerScreen";
import UserFollowersScreen from "../screens/Dashboard/UserFollowersScreen";
import UserFolloweesScreen from "../screens/Dashboard/UserFolloweesScreen";
import UserPublicationsScreen from "../screens/Dashboard/UserPublicationsScreen";
import PostInteractionScreen from "../screens/Post/PostInteractionScreen";
import SearchScreen from "../screens/SearchScreen";
import MagazineSearchScreen from "../screens/MagazineSearchScreen";
import LoginWithPhoneNumberScreen from "../screens/LoginWithPhoneNumberScreen";
import RegisterScreen from "../screens/RegisterScreen";

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

const ExplorerStack = createStackNavigator(
  {
    Profile: {
      path: "users/:user_id",
      screen: ProfileScreen,
    },
    Post: {
      path: "posts/:post_id",
      screen: PostScreen,
    },
    Comment: {
      path: "comments/:comment_id",
      screen: CommentFeedScreen,
    },
    SharePost: {
      path: "post/:post_id/share",
      screen: SharePostScreen,
    },
    PostInteraction: {
      path: "post/:post_id/interactions",
      screen: PostInteractionScreen,
    },
    Explorer: {
      path: "posts",
      screen: ExplorerScreen,
    },
  },
  {
    initialRouteName: "Explorer",
    headerMode: "none",
    transitionConfig: configNavigation,
  }
);

ExplorerStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible,
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
    MagazineSearch: {
      path: "magazines/search",
      screen: MagazineSearchScreen,
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
    PodcastEpisode: {
      path: "podcast/:podcast_id/:episode_id",
      screen: PodcastEpisodeScreen,
    },
    Comment: {
      path: "comments/:comment_id",
      screen: CommentFeedScreen,
    },
    NewsExplorer: {
      path: "news",
      screen: NewsExplorerScreen,
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

const DashboardStack = createStackNavigator(
  {
    Dashboard: {
      screen: DashboardScreen,
      navigationOptions: {
        tabBarLabel: "Moi",
      },
    },
    Notifications: {
      path: "article",
      screen: NotificationsScreen,
    },
    UserFollowers: {
      path: "user_followers",
      screen: UserFollowersScreen,
    },
    UserFollowees: {
      path: "user_followees",
      screen: UserFolloweesScreen,
    },
    UserPublications: {
      path: "user_followees",
      screen: UserPublicationsScreen,
    },
  },
  {
    initialRouteName: "Dashboard",
    headerMode: "none",
    transitionConfig: configNavigation,
  }
);
DashboardStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible,
  };
};

const TrendsStack = createStackNavigator(
  {
    Profile: {
      path: "users/:user_id",
      screen: ProfileScreen,
    },
    Post: {
      path: "posts/:post_id",
      screen: PostScreen,
    },
    Comment: {
      path: "comments/:comment_id",
      screen: CommentFeedScreen,
    },
    SharePost: {
      path: "post/:post_id/share",
      screen: SharePostScreen,
    },
    PostInteraction: {
      path: "post/:post_id/interactions",
      screen: PostInteractionScreen,
    },
    Trends: {
      screen: TrendsScreen,
    },
    Search: {
      screen: SearchScreen,
    },
  },
  {
    initialRouteName: "Trends",
    headerMode: "none",
    transitionConfig: configNavigation,
  }
);

TrendsStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible,
  };
};

const CreatePostStack = createStackNavigator(
  {
    CreatePost: {
      screen: CreatePostScreen,
      navigationOptions: {
        tabBarLabel: "Nouveau",
      },
    },
  },
  {
    initialRouteName: "CreatePost",
    headerMode: "none",
    transitionConfig: configNavigation,
  }
);

CreatePostStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = false;

  return {
    tabBarVisible,
  };
};

const HomeTabNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: HomeStack,
      navigationOptions: {
        tabBarLabel: "Média",
      },
    },
    Explorer: {
      screen: ExplorerStack,
      navigationOptions: {
        tabBarLabel: "Explorer",
      },
    },
    CreatePost: {
      screen: CreatePostStack,
      navigationOptions: {
        tabBarLabel: "Nouveau",
      },
    },
    Trends: {
      screen: TrendsStack,
      navigationOptions: {
        tabBarLabel: "Tendances",
      },
    },
    Dashboard: {
      screen: DashboardStack,
      navigationOptions: {
        tabBarLabel: "Moi",
      },
    },
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        switch (routeName) {
          case "Dashboard":
            return <UserAvatar />;
          case "Explorer":
            return <SearchIcon fill={tintColor} />;
          case "Home":
            return <HomeIcon fill={tintColor} />;
          case "Notifications":
            return <NotificationIcon fill={tintColor} />;
          case "CreatePost":
            return <Entypo name="plus" size={24} color={tintColor} />;
          case "Trends":
            return <Entypo name="compass" size={24} color={tintColor} />;
        }
      },
    }),
    tabBarOptions: {
      activeTintColor: "#fff",
      inactiveTintColor: "#92929d",
      showLabel: true,
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
    LoginWithPhoneNumber: {
      path: "login_with_phone_number_screen",
      screen: LoginWithPhoneNumberScreen,
    },
    Register: {
      path: "register",
      screen: RegisterScreen,
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
