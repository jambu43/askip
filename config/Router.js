import React from "react";
import {
  createAppContainer,
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";
import LoginScreen from "../screens/LoginScreen";
import HomeScreen from "../screens/HomeScreen";
import ExplorerScreen from "../screens/ExplorerScreen";
import MyMusicScreen from "../screens/MyMusicScreen";
import CastingsScreen from "../screens/CastingsScreen";
import {
  HeartIcon,
  HomeIcon,
  SearchIcon,
  MicroIcon
} from "../components/Icons";

const HomeTabNavigator = createBottomTabNavigator(
  {
    Home: HomeScreen,
    Explorer: ExplorerScreen,
    MyMusic: MyMusicScreen,
    Castings: CastingsScreen
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        switch (routeName) {
          case "MyMusic":
            return <HeartIcon fill={tintColor} />;
          case "Explorer":
            return <SearchIcon fill={tintColor} />;
          case "Home":
            return <HomeIcon fill={tintColor} />;
          case "Castings":
            return <MicroIcon fill={tintColor} />;
        }
      }
    }),
    tabBarOptions: {
      activeTintColor: "#2692b7",
      inactiveTintColor: "#23232a"
    }
  }
);

const AppNavigator = createStackNavigator(
  {
    Login: {
      path: "login",
      screen: LoginScreen
    },
    HomeStack: {
      path: "home",
      screen: HomeTabNavigator
    }
  },
  {
    initialRouteName: "HomeStack",
    headerMode: "none"
  }
);

const Rooter = createAppContainer(AppNavigator);

export default Rooter;
