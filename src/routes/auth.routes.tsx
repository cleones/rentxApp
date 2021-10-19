import React from 'react';

import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';

import { Confirmation } from '../screens/Confirmation';
import { Splash } from '../screens/Splash';
import { SignIn } from '../screens/SignIn';
import { SignUpFirstStep } from '../screens/SignUp/SignUpFirstStep';
import { SignUpSecondStep } from '../screens/SignUp/SignUpSecondStep';
import { RouteProp } from '@react-navigation/core';

export type RootAuthParamList = {
  Splash: undefined;
  SignIn: undefined;
  SignUpFirstStep: undefined;
  SignUpSecondStep: {
    user: {
      name: string;
      email: string;
      cnh: string;
    };
  };
  Confirmation: {
    title: string;
    message: string;
    nextScreenRoutes: keyof RootAuthParamList;
  };
};

export type SplashScreenNavigationProp = NativeStackNavigationProp<
  RootAuthParamList,
  'Splash'
>;
export type SignInScreenNavigationProp = NativeStackNavigationProp<
  RootAuthParamList,
  'SignIn'
>;
export type SignUpFirstStepScreenNavigationProp = NativeStackNavigationProp<
  RootAuthParamList,
  'SignUpFirstStep'
>;
export type SignUpSecondStepScreenNavigationProp = NativeStackNavigationProp<
  RootAuthParamList,
  'SignUpSecondStep'
>;
export type ConfirmationScreenNavigationProp = NativeStackNavigationProp<
  RootAuthParamList,
  'Confirmation'
>;

export type SignUpSecondStepRoutProp = RouteProp<
  RootAuthParamList,
  'SignUpSecondStep'
>;
export type ConfirmationRoutProp = RouteProp<RootAuthParamList, 'Confirmation'>;

const { Navigator, Screen } = createNativeStackNavigator<RootAuthParamList>();

const AuthRouters = () => {
  return (
    <Navigator
      initialRouteName='Splash'
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
      }}
    >
      <Screen name='Splash' component={Splash} />
      <Screen name='SignIn' component={SignIn} />
      <Screen name='SignUpFirstStep' component={SignUpFirstStep} />
      <Screen name='SignUpSecondStep' component={SignUpSecondStep} />
      <Screen
        name='Confirmation'
        component={Confirmation}
        options={{
          gestureEnabled: true,
        }}
      />
    </Navigator>
  );
};

export { AuthRouters };
