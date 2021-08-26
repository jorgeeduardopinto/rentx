import React, { useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTheme } from 'styled-components';
import { api } from '../../../services/api';
import { 
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert
} from 'react-native';

import { BackButton } from '../../../components/BackButton';
import { Bullet } from '../../../components/Bullet';
import { Button } from '../../../components/Button';
import { PasswordInput } from '../../../components/PasswordInput';

import {
  Container,
  Header,
  Steps,
  Title,
  SubTitle,
  Form,
  FormTitle
} from './styles';

interface Params {
  user: {
    name: string;
    email: string;
    driverLicense: string;
  }
}

interface NavigationProps {
  goBack: () => void;
  navigate: (screen: string, {}) => void;
}

export function SignUpSecondStep() {
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const theme = useTheme();
  const navigation = useNavigation<NavigationProps>();
  const route = useRoute();

  const { user } = route.params as Params;

  function handleBack(){
    navigation.goBack();
  }

  async function handleRegister() {
    if(!password || !passwordConfirm){
      return Alert.alert('Informe a senha e confirmação')
    }
    if(password != passwordConfirm){
      return Alert.alert('As senhas não são iguais')
    }

    await api.post('/users', {
      name: user.name,
      email: user.email,
      driver_license: user.driverLicense,
      password,
    })
    .then(() => {
      navigation.navigate('Confirmation', {
        nextScreenRoute: 'SignIn',
        title: 'Conta Criada!',
        message: `Agora é só fazer login\ne aproveitar.`
      });
    })
    .catch(() => {
      Alert.alert('Opa','Não foi possível cadastrar');
    })


  }

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
        <Header>
          <BackButton onPress={handleBack} />
          <Steps>
            <Bullet />
            <Bullet active/>
          </Steps>
        </Header>

        <Title>
          Crie sua{'\n'}conta
        </Title>
        <SubTitle>
          Faça seu cadastro de {'\n'}
          forma rápida e fácil
        </SubTitle>

        <Form>
          <FormTitle>2. Senha</FormTitle>
          <PasswordInput
            iconName="lock"
            placeholder="Senha"
            onChangeText={setPassword}
            value={password}
          />
          <PasswordInput
            iconName="lock"
            placeholder="Repetir Senha"
            onChangeText={setPasswordConfirm}
            value={passwordConfirm}
          />
        </Form>

        <Button
          color={theme.colors.success}
          title="Cadastrar"
          onPress={handleRegister}
        />
      </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}