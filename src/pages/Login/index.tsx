import { useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
      
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import { Button, Input } from '@/components';

import {
  UserType,
} from '@/services/api';

import { getValidationErrors } from '@/utils';
import { useAuth, useBoolean } from '@/hooks';

import logo from '@/assets/images/logo.png';

import {
  Container,
  Content,
  MainContent,
  FormContainer
} from './styles';

export function Login() {
  const { signIn } = useAuth();
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();

  const loadingSignIn = useBoolean(false);

  async function handleSignInUser(data: UserType.AppLoginParams) {
    loadingSignIn.changeToTrue();

    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        email: Yup.string().required('This field is required').email('Enter a valid email address'),
        password: Yup.string().required('This field is required'),
      });
  
      await schema.validate(data, {
        abortEarly: false
      });

      await signIn(data);

      loadingSignIn.changeToFalse();

      history.push('/dashboard');

    } catch(err) {
      loadingSignIn.changeToFalse();

      if(err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);
        
        formRef.current?.setErrors(errors);

        return;
      }

      formRef.current?.setErrors({
        email: 'E-mail/password incorrect'
      });
    }
  }

  return (
    <Container>
      <Content>
        <MainContent>
          <img src={logo} alt="App Logo" className="app_logo"/>
          <FormContainer ref={formRef} onSubmit={handleSignInUser}>
            <h1 className="page_title">Login</h1>
            <div className="inputs">
              <Input 
                name="email" 
                labelText="E-mail"
                placeholder="E-mail..."
                type="text"
              />
              <Input
                name="password" 
                labelText="Password"
                placeholder="Password..."
                type="password"
              />
            </div>
            <Button 
              className="button_submit" 
              type="submit"
              text="Login"
              loading={{
                state: loadingSignIn.state,
              }}
            />

            <footer>
              <span className="to_login">
                Don't have an account?
                <Link to="/register">Sign up</Link>
              </span>
              <span className="forgot_password">
                <Link to="/forgot">Forgot Password</Link>
              </span>

              <span className="app_name">The Monkeynauts</span>
            </footer>
          </FormContainer>
        </MainContent>
      </Content>
    </Container>
  )
}