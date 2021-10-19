import React from 'react';
import { useWindowDimensions, StatusBar } from 'react-native';

import LogoSvg from '../../assets/logo_background_gray.svg';
import DoneSvg from '../../assets/done.svg';

import { Container, Content, Title, Message, Footer } from './styles';
import { ConfirmButton } from '../../components/ConfirmButton';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ConfirmationRoutProp } from '../../routes/app.stack.routes';
import { HomeScreenNavigationProp } from '../../routes/app.tab.routes';

const Confirmation = () => {
  const { width } = useWindowDimensions();
  const { navigate } = useNavigation<HomeScreenNavigationProp>();
  const {
    params: { title, message, nextScreenRoutes },
  } = useRoute<ConfirmationRoutProp>();

  const handleSchedulingFinalized = (): void => {
    navigate(nextScreenRoutes);
  };
  return (
    <Container>
      <StatusBar
        backgroundColor='transparent'
        barStyle='light-content'
        translucent
      />
      <LogoSvg width={width} />

      <Content>
        <DoneSvg width={80} height={80} />
        <Title>{title}</Title>
        <Message>{message}</Message>
      </Content>
      <Footer>
        <ConfirmButton title='OK' onPress={handleSchedulingFinalized} />
      </Footer>
    </Container>
  );
};

export { Confirmation };
