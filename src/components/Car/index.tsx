import React from 'react';

import {
  Container,
  Details,
  Brand,
  Name,
  About,
  Rent,
  Period,
  Price,
  Type,
  CarImage,
} from './styles';
import GasolineSvg from '../../assets/gasoline.svg';
import { RectButtonProps } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { CarDetailsScreenNavigationProp } from '../../routes/app.stack.routes';
import { ICarDTO } from '../../dtos/CarDto';
import { icons } from '../../utils/icons';

interface ICarProps extends RectButtonProps {
  data: ICarDTO;
}

const Car = ({ data }: ICarProps) => {
  const { brand, name, period, price, thumbnail, id, fuel_type } = data;
  const { navigate } = useNavigation<CarDetailsScreenNavigationProp>();
  const Icon = icons[fuel_type] || GasolineSvg;

  const handleCarDetails = () => {
    navigate('CarDetails', {
      carId: id,
    });
  };
  return (
    <Container onPress={handleCarDetails}>
      <Details>
        <Brand>{brand}</Brand>
        <Name>{name}</Name>
        <About>
          <Rent>
            <Period>{period}</Period>
            <Price>{`R$ ${price}`}</Price>
          </Rent>
          <Type>{<Icon />}</Type>
        </About>
      </Details>
      <CarImage
        resizeMode='contain'
        source={{
          uri: thumbnail,
        }}
      />
    </Container>
  );
};

export { Car };
