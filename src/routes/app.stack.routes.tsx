import React from 'react';

import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';

import { CarDetails } from '../screens/CarDetails';
import { Scheduling } from '../screens/Scheduling';
import { Confirmation } from '../screens/Confirmation';
import { SchedulingDetails } from '../screens/SchedulingDetails';
import { Splash } from '../screens/Splash';
import { ICarDTO } from '../dtos/CarDto';
import { RouteProp } from '@react-navigation/core';
import { RootAuthParamList } from './auth.routes';
import { RootAppTabParamList } from './app.tab.routes';
import { Home } from '../screens/Home';

export type RootAppStackParamList = {
  Splash: undefined;
  Home: undefined;
  CarDetails: { carId: string };
  Scheduling: { car: ICarDTO };
  Confirmation: {
    title: string;
    message: string;
    nextScreenRoutes: keyof RootAppTabParamList;
  };
  SchedulingDetails: { car: ICarDTO; dates: string[] };
};

export type CarDetailsScreenNavigationProp = NativeStackNavigationProp<
  RootAppStackParamList,
  'CarDetails'
>;
export type SchedulingScreenNavigationProp = NativeStackNavigationProp<
  RootAppStackParamList,
  'Scheduling'
>;
export type ConfirmationScreenNavigationProp = NativeStackNavigationProp<
  RootAppStackParamList,
  'Confirmation'
>;
export type SchedulingDetailsScreenNavigationProp = NativeStackNavigationProp<
  RootAppStackParamList,
  'SchedulingDetails'
>;

export type CarDetailsRoutProp = RouteProp<RootAppStackParamList, 'CarDetails'>;
export type SchedulingRoutProp = RouteProp<RootAppStackParamList, 'Scheduling'>;
export type ConfirmationRoutProp = RouteProp<
  RootAppStackParamList,
  'Confirmation'
>;
export type SchedulingDetailsRoutProp = RouteProp<
  RootAppStackParamList,
  'SchedulingDetails'
>;

const { Navigator, Screen } =
  createNativeStackNavigator<RootAppStackParamList>();

const AppStackRouters = () => {
  return (
    <Navigator
      initialRouteName='Home'
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
      }}
    >
      <Screen
        name='Home'
        component={Home}
        options={{
          gestureEnabled: true,
        }}
      />
      <Screen
        name='CarDetails'
        component={CarDetails}
        options={{
          gestureEnabled: true,
        }}
      />
      <Screen
        name='Scheduling'
        component={Scheduling}
        options={{
          gestureEnabled: true,
        }}
      />
      <Screen
        name='Confirmation'
        component={Confirmation}
        options={{
          gestureEnabled: true,
        }}
      />
      <Screen
        name='SchedulingDetails'
        component={SchedulingDetails}
        options={{
          gestureEnabled: true,
        }}
      />
    </Navigator>
  );
};

export { AppStackRouters };
