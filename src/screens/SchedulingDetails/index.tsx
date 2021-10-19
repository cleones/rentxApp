import React, { useEffect, useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';

import { Button } from '../../components/Button';

import { Accessory } from '../../components/Accessory';
import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import CarSVG from '../../assets/car.svg';

import {
  Container,
  Header,
  CarImages,
  Content,
  Details,
  Description,
  Brand,
  Name,
  Rent,
  Period,
  Price,
  Accessories,
  Footer,
  RentalPeriod,
  CalendarIcon,
  DateInfo,
  DateTitle,
  DateValue,
  RentalPrice,
  RentalPriceLabel,
  RentalPriceDetail,
  RentalPriceQuota,
  RentalPriceTotal,
} from './styles';
import { useNavigation, useRoute } from '@react-navigation/native';
import {
  ConfirmationScreenNavigationProp,
  SchedulingDetailsRoutProp,
} from '../../routes';
import { icons } from '../../utils/icons';
import { format } from 'date-fns';
import { getPlatformDate } from '../../utils/getPlatformDate';
import { api } from '../../services/api';

interface RentalPeriod {
  start: string;
  end: string;
}

const SchedulingDetails = () => {
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const [rentalPeriod, setPRentalPeriod] = useState<RentalPeriod>(
    {} as RentalPeriod
  );
  const { params } = useRoute<SchedulingDetailsRoutProp>();
  const { car, dates } = params;
  const { goBack, navigate } =
    useNavigation<ConfirmationScreenNavigationProp>();

  const handleSchedulingComplete = async (): Promise<void> => {
    setLoading(true);
    const { data: schedulesByCar } = await api.get(
      `/schedules_bycars/${car.id}`
    );
    const unavailableDates = [...schedulesByCar.unavailable_dates, ...dates];
    await api
      .post(`/schedules_byuser/`, {
        user_id: 1,
        car,
        startDate: rentalPeriod.start,
        endDate: rentalPeriod.end,
      })
      .catch((error) => {
        console.log('deu merda no post', error);
      });
    await api
      .put(`/schedules_bycars/${car.id}`, {
        id: car.id,
        unavailable_dates: unavailableDates,
      })
      .catch((error) => console.log('deu merda no put', error));
    setLoading(false);
    navigate('Confirmation', {
      title: 'Carro alugado',
      message: `Agora você só precisa ir\n até a concessionárioda RENTX\n pegar o seu automóvel`,
      nextScreenRoutes: 'Home',
    });
  };
  useEffect(() => {
    setPRentalPeriod(() => ({
      start: format(getPlatformDate(new Date(dates[0])), 'dd/MM/yyyy'),
      end: format(
        getPlatformDate(new Date(dates[dates.length - 1])),
        'dd/MM/yyyy'
      ),
    }));
  }, [dates]);
  return (
    <Container>
      <Header>
        <BackButton
          onPress={() => {
            goBack();
          }}
        />
      </Header>
      <CarImages>
        <ImageSlider imagesUrl={car.photos.map((photo) => photo.photo)} />
      </CarImages>
      <Content>
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>
          <Rent>
            <Period></Period>
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
        <RentalPeriod>
          <CalendarIcon>
            <Feather
              name='calendar'
              size={RFValue(24)}
              color={theme.colors.shape}
            />
          </CalendarIcon>
          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue>{rentalPeriod.start}</DateValue>
          </DateInfo>
          <Feather
            name='chevron-right'
            size={RFValue(18)}
            color={theme.colors.text}
          />
          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue>{rentalPeriod.end}</DateValue>
          </DateInfo>
        </RentalPeriod>
        <RentalPrice>
          <RentalPriceLabel>TOTAL</RentalPriceLabel>
          <RentalPriceDetail>
            <RentalPriceQuota>{`R$ ${car.price} x${dates.length} diárias`}</RentalPriceQuota>
            <RentalPriceTotal>{`R$ ${
              car.price * dates.length
            }`}</RentalPriceTotal>
          </RentalPriceDetail>
        </RentalPrice>
      </Content>
      <Footer>
        <Button
          enabled
          title='Alugar agora'
          color={theme.colors.success}
          onPress={handleSchedulingComplete}
          loading={loading}
        />
      </Footer>
    </Container>
  );
};

export { SchedulingDetails };
