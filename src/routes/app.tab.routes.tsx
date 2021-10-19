import React from 'react';

import {
  createBottomTabNavigator,
  BottomTabNavigationProp,
} from '@react-navigation/bottom-tabs';
import { Home } from '../screens/Home';
import { MyCars } from '../screens/MyCars';
import { RouteProp } from '@react-navigation/core';
import { AppStackRouters } from './app.stack.routes';

import HomeSVG from '../assets/home.svg';
import PeopleSVG from '../assets/people.svg';
import CarSVG from '../assets/car.svg';
import { useTheme } from 'styled-components';
import { Platform } from 'react-native';

export type RootAppTabParamList = {
  HomeTab: undefined;
  MyCars: undefined;
  Profile: undefined;
};

export type HomeScreenNavigationProp = BottomTabNavigationProp<
  RootAppTabParamList,
  'HomeTab'
>;
export type MyCarsScreenNavigationProp = BottomTabNavigationProp<
  RootAppTabParamList,
  'MyCars'
>;
export type HomeRoutProp = RouteProp<RootAppTabParamList, 'HomeTab'>;
export type ProfileRoutProp = RouteProp<RootAppTabParamList, 'Profile'>;
export type MyCarsRoutProp = RouteProp<RootAppTabParamList, 'MyCars'>;

const icons = {
  HomeTab: HomeSVG,
  Profile: PeopleSVG,
  MyCars: CarSVG,
};

const { Navigator, Screen } = createBottomTabNavigator<RootAppTabParamList>();

const AppTabRouters = () => {
  const theme = useTheme();
  return (
    <Navigator
      screenOptions={({ route }) => ({
        gestureEnabled: true,
        animationEnabled: false,
        tabBarActiveTintColor: theme.colors.main,
        tabBarInactiveTintColor: theme.colors.text_detail,

        tabBarShowLabel: false,
        tabBarIcon: ({ color, focused }) => {
          const Icon = icons[route.name];
          return <Icon width={24} height={24} fill={color} />;
        },

        headerShown: false,
        tabBarStyle: {
          paddingVertical: Platform.OS === 'ios' ? 20 : 0,
          height: 78,
          backgroundColor: theme.colors.background_primary,
        },
      })}
    >
      <Screen name='HomeTab' component={AppStackRouters} />
      <Screen name='MyCars' component={MyCars} />
      <Screen name='Profile' component={Home} />
    </Navigator>
  );
};

export { AppTabRouters };
