import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Alert,
  Keyboard,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { BackButton } from '../../../components/BackButton';
import { Bullet } from '../../../components/Bullet';
import { Button } from '../../../components/Button';
import { PasswordInput } from '../../../components/PasswordInput';
import {
  SignUpSecondStepRoutProp,
  SignUpSecondStepScreenNavigationProp,
} from '../../../routes';
import {
  Steps,
  Container,
  Header,
  Title,
  SubTitle,
  Form,
  FormTitle,
} from './styles';
import { useTheme } from 'styled-components';
import { api } from '../../../services/api';

const SignUpSecondStep = () => {
  const { goBack, navigate } =
    useNavigation<SignUpSecondStepScreenNavigationProp>();
  const theme = useTheme();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const {
    params: { user },
  } = useRoute<SignUpSecondStepRoutProp>();

  const handleRegister = async () => {
    if (!password || !confirmPassword) {
      return Alert.alert('Campos obrigatórios');
    }
    if (password !== confirmPassword) {
      return Alert.alert('Campos devem ser iguais');
    }

    await api
      .post('/users', {
        name: user.name,
        email: user.email,
        driver_license: user.cnh,
        password,
      })
      .then(() => {
        navigate('Confirmation', {
          title: 'Conta Criada!',
          message: `Agora é só fazer login\ne aproveitar`,
          nextScreenRoutes: 'SignIn',
        });
      })
      .catch(() => {
        Alert.alert('Opa', 'Não foi possível cadastrar');
      });
  };

  return (
    <KeyboardAvoidingView behavior='position' enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header>
            <BackButton onPress={goBack} />
            <Steps>
              <Bullet />
              <Bullet active />
            </Steps>
          </Header>
          <Title>
            Crie sua {'\n'}
            conta
          </Title>
          <SubTitle>
            Faça seu cadastro de{'\n'}
            forma rápida e fácil.
          </SubTitle>
          <Form>
            <FormTitle>2. Senha</FormTitle>

            <PasswordInput
              iconName='lock'
              placeholder='Senha'
              value={password}
              onChangeText={(value) => setPassword(value)}
            />
            <PasswordInput
              iconName='lock'
              placeholder='Repetir senha'
              value={confirmPassword}
              onChangeText={(value) => setConfirmPassword(value)}
            />
          </Form>
          <Button
            title='Cadastrar'
            enabled
            color={theme.colors.success}
            onPress={handleRegister}
          />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export { SignUpSecondStep };
