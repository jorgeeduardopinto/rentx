import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native'
import { 
  StatusBar,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert
} from 'react-native';

import * as Yup from 'yup';

import { useTheme } from 'styled-components';
import { useAuth } from '../../hooks/auth';
import { Button } from '../../components/Button';

import { Input } from '../../components/Input';
import { PasswordInput } from '../../components/PasswordInput';
 
import {
  Container,
  Header,
  Title,
  Form,
  SubTitle,
  Footer
} from './styles';

interface NavigationProps {
  navigate: (screen: string) => void;
}

export function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation<NavigationProps>();
  const { signIn } = useAuth();

  async function handleSignIn(){
    try {

      const schema = Yup.object().shape({
        email: Yup.string()
          .required('E-mail obrigatório')
          .email('Digite um e-mail válido'),
        password: Yup.string()
          .required('A senha é obrigatória')
      });
  
      await schema.validate({ email, password });

      signIn({ email, password })

    } catch (error) {

      if(error instanceof Yup.ValidationError){
        Alert.alert('Opa', error.message);
      } else {
        Alert.alert(
          'Erro na autenticação',
          'Ocorreu um erro ao fazer login. Verifique as credenciais'
        )
      }
    }

    
  }

  function handleNewAccount(){
    navigation.navigate('SignUpFirstStep')
  }

  const theme = useTheme();

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <StatusBar
            barStyle="dark-content"
            backgroundColor="transparent"
            translucent
          />
          <Header>
            <Title>
              Estamos{'\n'}quase lá.
            </Title>
            <SubTitle>
              Faça seu login para começar{'\n'}
              uma experiência incrível.
            </SubTitle>
          </Header>

          <Form>
            <Input
              iconName="mail"
              placeholder="E-mail"
              keyboardType="email-address"
              autoCorrect={false}
              onChangeText={setEmail}
              autoCapitalize="none"
              value={email}
            />

            <PasswordInput
              iconName="lock"
              placeholder="Senha"
              onChangeText={setPassword}
              value={password}
            />
          </Form>
          
          <Footer>
            <Button 
              title="Login"
              onPress={handleSignIn}
              enabled={true}
              loading={false}
            />
            <Button 
              title="Criar conta gratuita"
              color={theme.colors.background_secondary}
              light
              onPress={handleNewAccount}
              enabled={true}
              loading={false}
            />
          </Footer>
        </Container>
       </TouchableWithoutFeedback>
    </KeyboardAvoidingView>

  );
}