import React, { useState } from 'react';
import { Alert, StatusBar } from 'react-native';
import { useTheme } from 'styled-components';
import { BackButton } from '../../components/BackButton';
import {
  Container,
  Header,
  Title,
  RentalPeriod,
  DataInfo,
  DataTitle,
  DataValueWrapper,
  DataValue,
  Content,
  Footer,
} from './styles';
import ArrowSvg from '../../assets/arrow.svg';
import { Button } from '../../components/Button';
import { Calendar, DayProps, MarkedDateProps } from '../../components/Calendar';
import { useNavigation, useRoute } from '@react-navigation/native';
import {
  SchedulingDetailsScreenNavigationProp,
  SchedulingRoutProp,
} from '../../routes';
import { generateInterval } from '../../components/Calendar/generateInterval';
import { format } from 'date-fns/esm';
import { getPlatformDate } from '../../utils/getPlatformDate';

interface RentalPeriod {
  start: number;
  end: number;
  startFormatted: string;
  endFormatted: string;
}

const Scheduling = () => {
  const theme = useTheme();
  const { params } = useRoute<SchedulingRoutProp>();
  const car = params.car;
  const [lastSelectedDate, setLastSelectedDate] = useState<DayProps>(
    {} as DayProps
  );
  const [markedDates, setMarkedDates] = useState<MarkedDateProps>(
    {} as MarkedDateProps
  );

  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>(
    {} as RentalPeriod
  );
  const { goBack, navigate } =
    useNavigation<SchedulingDetailsScreenNavigationProp>();

  const handleSchedulingDetails = (): void => {
    navigate('SchedulingDetails', { car, dates: Object.keys(markedDates) });
  };

  const handleChangeDate = (date: DayProps): void => {
    let start = !lastSelectedDate.timestamp ? date : lastSelectedDate;
    let end = date;
    if (start.timestamp > end.timestamp) {
      const swap = start;
      start = end;
      end = swap;
    }
    setLastSelectedDate(end);
    const interval = generateInterval(start, end);
    const intervalKey = Object.keys(interval);
    setMarkedDates(interval);

    const firstDate = intervalKey[0];
    const endDate = intervalKey[intervalKey.length - 1];
    setRentalPeriod({
      start: start.timestamp,
      end: end.timestamp,
      startFormatted: format(
        getPlatformDate(new Date(firstDate)),
        'dd/MM/yyyy'
      ),
      endFormatted: format(getPlatformDate(new Date(endDate)), 'dd/MM/yyyy'),
    });
  };
  return (
    <Container>
      <Header>
        <StatusBar
          backgroundColor='transparent'
          barStyle='light-content'
          translucent
        />
        <BackButton
          onPress={() => {
            goBack();
          }}
          color={theme.colors.shape}
        />
        <Title>
          Escolha uma {'\n'}
          data de início e {'\n'}
          fim do aluguel
        </Title>
        <RentalPeriod>
          <DataInfo>
            <DataTitle>DE</DataTitle>
            <DataValueWrapper selected={!!rentalPeriod.startFormatted}>
              <DataValue>{rentalPeriod.startFormatted}</DataValue>
            </DataValueWrapper>
          </DataInfo>
          <ArrowSvg />
          <DataInfo>
            <DataTitle>ATÉ</DataTitle>
            <DataValueWrapper selected={!!rentalPeriod.endFormatted}>
              <DataValue>{rentalPeriod.endFormatted}</DataValue>
            </DataValueWrapper>
          </DataInfo>
        </RentalPeriod>
      </Header>
      <Content>
        <Calendar markedDates={markedDates} onDayPress={handleChangeDate} />
      </Content>
      <Footer>
        <Button
          title='Confirmar'
          onPress={handleSchedulingDetails}
          enabled={!!rentalPeriod.endFormatted}
        />
      </Footer>
    </Container>
  );
};

export { Scheduling };
