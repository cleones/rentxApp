import React, { useState } from 'react';
import {
  StatusBar,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';
import * as Yup from 'yup';
import { useTheme } from 'styled-components';
import { useNavigation } from '@react-navigation/native';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { PasswordInput } from '../../components/PasswordInput';

import { Container, Header, SubTitle, Title, Form, Footer } from './styles';

import { SignInScreenNavigationProp } from '../../routes/auth.routes';
import { useAuth } from '../../hooks/auth';

const SignIn = () => {
  const theme = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);

  const { signIn } = useAuth();

  const { navigate } = useNavigation<SignInScreenNavigationProp>();

  const handleNewAccount = () => {
    navigate('SignUpFirstStep');
  };

  const handleSingIn = async () => {
    setLoading(true);
    const schema = Yup.object().shape({
      email: Yup.string()
        .required('Email obrigatório')
        .email('Digite um email válido'),
      password: Yup.string().required('Password obrigatório'),
    });
    try {
      await schema.validate({ email, password });

      await signIn({ email, password });
    } catch (error) {
      setLoading(false);
      if (error instanceof Yup.ValidationError) {
        return Alert.alert('Opa', error.message);
      }

      return Alert.alert('Erro na autenticação', 'Verifique as credenciais');
    }
  };

  return (
    <KeyboardAvoidingView behavior='position' enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <StatusBar
            barStyle='dark-content'
            backgroundColor='transparent'
            translucent
          />
          <Header>
            <Title>Estamos{'\n'}quase lá.</Title>
            <SubTitle>
              Faça seu login para começar{'\n'}uma experiência incrível.
            </SubTitle>
          </Header>
          <Form>
            <Input
              iconName='mail'
              value={email}
              onChangeText={setEmail}
              placeholder='E-mail'
              autoCorrect={false}
              autoCapitalize='none'
              keyboardType='email-address'
            />
            <PasswordInput
              iconName='lock'
              value={password}
              onChangeText={setPassword}
              placeholder='Senha'
            />
          </Form>

          <Footer>
            <Button
              title='Login'
              onPress={handleSingIn}
              enabled={true}
              loading={loading}
            />
            <Button
              title='Criar conta gratuita'
              color={theme.colors.background_secondary}
              onPress={handleNewAccount}
              enabled={true}
              loading={false}
              light
            />
          </Footer>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export { SignIn };
