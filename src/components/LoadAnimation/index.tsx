import React from 'react';
import LottieView from 'lottie-react-native';

import loadingCar from '../../assets/loadingCar.json';
import { Container } from './styles';

const LoadAnimation = () => {
  return (
    <Container>
      <LottieView
        source={loadingCar}
        loop
        autoPlay
        resizeMode='contain'
        style={{ height: 200 }}
      />
    </Container>
  );
};

export { LoadAnimation };
