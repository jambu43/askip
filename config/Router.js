import React from 'react';
import styled from 'styled-components';
import { createAppContainer, createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import LoginScreen from '../screens/LoginScreen';
import MagazineScreen from '../screens/MagazineScreen';
import ArticleScreen from '../screens/ArticleScreen';
import ExplorerScreen from '../screens/ExplorerScreen';
import Profile from '../screens/Profile';
import HomeScreen from '../screens/HomeScreen';
import ArtistScreen from '../screens/ArtistScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import { NotificationIcon, SearchIcon, MicroIcon } from '../components/Icons';
import WelcomeScreen from '../screens/WelcomeScreen';
import UserAvatar from '../components/generic/UserAvatar';
import { dark } from './variables';

const BottomTransition = (index, position, height) => {
	const sceneRange = [ index - 1, index, index + 1 ];
	const outPutHeight = [ height, 0, 0 ];
	const transition = position.interpolate({
		inputRange: sceneRange,
		outputRange: outPutHeight
	});

	return {
		transform: [
			{
				translateY: transition
			}
		]
	};
};

const SlideTransition = (index, position, width) => {
	const sceneRange = [ index - 1, index, index + 1 ];
	const outPutWidth = [ width, 0, 0 ];
	const transition = position.interpolate({
		inputRange: sceneRange,
		outputRange: outPutWidth
	});

	return {
		transform: [
			{
				translateX: transition
			}
		]
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
		}
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
		}
	};
};

const HomeStack = createStackNavigator(
	{
		Article: {
			path: 'article',
			screen: ArticleScreen
		},
		Magazine: {
			path: 'magazine',
			screen: MagazineScreen
		},
		Home: {
			path: 'home',
			screen: HomeScreen
		}
	},
	{
		initialRouteName: 'Home',
		headerMode: 'none',
		transitionConfig: configNavigation
	}
);

const HomeTabNavigator = createBottomTabNavigator(
	{
		Home: HomeStack,
		Explorer: ExplorerScreen,
		Notifications: NotificationsScreen,
		Profile: {
			screen: Profile,
			label: 'Moi'
		}
	},
	{
		defaultNavigationOptions: ({ navigation }) => ({
			tabBarIcon: ({ focused, horizontal, tintColor }) => {
				const { routeName } = navigation.state;
				switch (routeName) {
					case 'Profile':
						return <UserAvatar />;
					case 'Explorer':
						return <SearchIcon fill={tintColor} />;
					case 'Home':
						return <MicroIcon fill={tintColor} />;
					case 'Notifications':
						return <NotificationIcon fill={tintColor} />;
				}
			}
		}),
		tabBarOptions: {
			activeTintColor: '#fff',
			inactiveTintColor: '#92929d',
			showLabel: false,
			style: {
				backgroundColor: dark
			}
		},
		transitionConfig: configSlideNavigation
	}
);

const AppNavigator = createStackNavigator(
	{
		Login: {
			path: 'login',
			screen: LoginScreen
		},
		Artist: {
			path: 'artiste',
			screen: ArtistScreen
		},
		Welcome: {
			path: 'welcome',
			screen: WelcomeScreen
		},
		HomeStack: HomeTabNavigator
	},
	{
		initialRouteName: 'Login',
		headerMode: 'none'
	}
);

const Rooter = createAppContainer(AppNavigator);
export default Rooter;
