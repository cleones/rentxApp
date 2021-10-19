import React, { useState } from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  useAnimatedScrollHandler,
  Extrapolate,
} from 'react-native-reanimated';
import { Accessory } from '../../components/Accessory';
import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';

import CarSVG from '../../assets/car.svg';

import {
  Container,
  Header,
  CarImages,
  Details,
  Description,
  Brand,
  Name,
  Rent,
  Period,
  Price,
  About,
  Accessories,
  Footer,
  LoadingContainer,
} from './styles';
import { Button } from '../../components/Button';
import { useNavigation, useRoute } from '@react-navigation/native';
import {
  CarDetailsRoutProp,
  SchedulingScreenNavigationProp,
} from '../../routes/app.stack.routes';
import { useEffect } from 'react';
import { api } from '../../services/api';
import { ActivityIndicator, StyleSheet } from 'react-native';
import { useTheme } from 'styled-components';
import { ICarDTO } from '../../dtos/CarDto';
import { icons } from '../../utils/icons';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { StatusBar } from 'react-native';
import { LoadAnimation } from '../../components/LoadAnimation';

const CarDetails = () => {
  const theme = useTheme();
  const { goBack, navigate } = useNavigation<SchedulingScreenNavigationProp>();
  const { params } = useRoute<CarDetailsRoutProp>();

  const [car, setCar] = useState<ICarDTO | null>(null);

  const scrollY = useSharedValue(0);
  const headerStyleAnimation = useAnimatedStyle(() => {
    return {
      height: interpolate(
        scrollY.value,
        [0, 200],
        [200, 70],
        Extrapolate.CLAMP
      ),
    };
  });
  const sliderCarsStyledAnimation = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollY.value, [0, 150], [1, 0], Extrapolate.CLAMP),
    };
  });

  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });

  const handleConfirmRental = (): void => {
    car && navigate('Scheduling', { car });
  };

  useEffect(() => {
    api.get(`/cars/${params.carId}`).then(({ data }) => {
      setCar(data);
    });
  }, [params.carId]);

  if (!car) {
    return <LoadAnimation />;
  }

  return (
    <Container>
      <StatusBar
        backgroundColor='transparent'
        barStyle='dark-content'
        translucent
      />

      <Animated.View
        style={[
          headerStyleAnimation,
          styles.header,
          { backgroundColor: theme.colors.background_secondary },
        ]}
      >
        <Header>
          <BackButton
            onPress={() => {
              goBack();
            }}
          />
        </Header>
        <Animated.View style={sliderCarsStyledAnimation}>
          <CarImages>
            <ImageSlider imagesUrl={car.photos.map((photo) => photo.photo)} />
          </CarImages>
        </Animated.View>
      </Animated.View>
      <Animated.ScrollView
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingTop: getStatusBarHeight() + 160,
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
        showsVerticalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
      >
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>
          <Rent>
            <Period>{car.period}</Period>
            <Price>{`R$ ${car.price}`}</Price>
          </Rent>
        </Details>
        <Accessories>
          {car.accessories.map((accessory) => (
            <Accessory
              key={accessory.id}
              name={accessory.name}
              icon={icons[accessory.type] || CarSVG}
            />
          ))}
        </Accessories>
        <About>
          {car.about}
          {car.about}
          {car.about}
          {car.about}
          {car.about}
        </About>
      </Animated.ScrollView>
      <Footer>
        <Button
          title='Escolher periodo do aluguel'
          onPress={handleConfirmRental}
          enabled
        />
      </Footer>
    </Container>
  );
};
const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    overflow: 'hidden',
    zIndex: 1,
  },
});
export { CarDetails };
