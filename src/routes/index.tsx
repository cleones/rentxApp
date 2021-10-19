import { NavigationContainer, RouteProp } from '@react-navigation/native';
import React from 'react';
import { AppStackRouters } from './app.stack.routes';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ICarDTO } from '../dtos/CarDto';
import { useAuth } from '../hooks/auth';
import { AppTabRouters } from './app.tab.routes';
import { AuthRouters } from './auth.routes';

export type SplashConfirmationParamList = {
  Home: undefined;
  SignIn: undefined;
  Splash: undefined;
};

export type HomeScreenNavigationProp = NativeStackNavigationProp<
  SplashConfirmationParamList,
  'Home'
>;

export type SplashScreenNavigationProp = NativeStackNavigationProp<
  SplashConfirmationParamList,
  'Splash'
>;

const Routes = () => {
  const { user } = useAuth();

  return (
    <NavigationContainer>
      {user ? <AppTabRouters /> : <AuthRouters />}
    </NavigationContainer>
  );
};

export { Routes };
