import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { BackHandler, StatusBar, StyleSheet } from 'react-native';

import { RFValue } from 'react-native-responsive-fontsize';
import Logo from '../../assets/logo.svg';
import { Car } from '../../components/Car';
import { ICarDTO } from '../../dtos/CarDto';
import { api } from '../../services/api';
import { CarList, Container, Header, HeaderContent, TotalCars } from './styles';

import { useNavigation } from '@react-navigation/native';

import { LoadAnimation } from '../../components/LoadAnimation';
import { MyCarsScreenNavigationProp } from '../../routes/app.tab.routes';

const Home = () => {
  const [cars, setCars] = useState<ICarDTO[]>([]);
  const [loading, setLoading] = useState(false);
  const { navigate, setOptions } = useNavigation<MyCarsScreenNavigationProp>();

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      return true;
    });
  }, []);

  useEffect(() => {
    setLoading(true);
    api
      .get('/cars')
      .then(({ data }) => {
        setCars(data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <Container>
      <StatusBar
        backgroundColor='transparent'
        barStyle='light-content'
        translucent
      />
      <Header>
        <HeaderContent>
          <Logo width={RFValue(108)} height={RFValue(12)} />
          <TotalCars>Total de {cars.length} carros</TotalCars>
        </HeaderContent>
      </Header>
      {loading ? (
        <LoadAnimation />
      ) : (
        <CarList
          data={cars}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <Car data={item} />}
        />
      )}
    </Container>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,

    justifyContent: 'center',
    alignItems: 'center',
  },
});

export { Home };
