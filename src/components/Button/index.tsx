import React from 'react';
import { ActivityIndicator } from 'react-native';
import { RectButtonProps } from 'react-native-gesture-handler';
import { useTheme } from 'styled-components';

import { Container, Title } from './styles';

interface Props extends RectButtonProps {
  title: string;
  color?: string;
  loading?: boolean;
  light?: boolean;
}

const Button = ({
  title,
  color,
  loading = false,
  light = false,
  ...rest
}: Props) => {
  const theme = useTheme();
  return (
    <Container
      enabled={rest.enabled && !loading}
      color={color || theme.colors.main}
      style={{ opacity: rest.enabled && !loading ? 1 : 0.5 }}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator color={theme.colors.shape} size='small' />
      ) : (
        <Title light={light}>{title}</Title>
      )}
    </Container>
  );
};

export { Button };
