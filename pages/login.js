import React, { useState } from 'react';
import Router from 'next/router';
import { css } from '@emotion/core';
import Layout from '../components/layout/Layout';
import { Form, Field, InputSubmit, Error } from '../components/ui/Form';
import useValidate from '../hooks/useValidate';
import validateLogin from '../validation/validateLogin';
import firebase from '../firebase';

const Login = () => {
  const [error, setError] = useState(null);
  const INITIAL_STATE = {
    email: '',
    password: '',
  };
  const {
    values,
    errors,
    handleChange,
    handleSubmit,
    handleBlur,
  } = useValidate(INITIAL_STATE, validateLogin, logUserIn);
  const { email, password } = values;
  async function logUserIn() {
    try {
      await firebase.login(email, password);
      Router.push('/');
    } catch ({ message }) {
      setError(message);
    }
  }
  return (
    <div>
      <Layout>
        <div className='container'>
          <h1
            css={css`
              text-align: center;
              margin-top: 5rem;
            `}
          >
            Log In To Account
          </h1>
          <Form onSubmit={handleSubmit} noValidate>
            <Field>
              <label htmlFor='email'>Email</label>
              <input
                type='email'
                id='email'
                placeholder='Your Email'
                name='email'
                value={email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Field>
            {errors.email && <Error>{errors.email}</Error>}
            <Field>
              <label htmlFor='password'>Password</label>
              <input
                type='password'
                id='password'
                placeholder='Your Password'
                name='password'
                value={password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Field>
            {errors.password && <Error>{errors.password}</Error>}
            {error && <Error>{error}</Error>}
            <InputSubmit type='submit' value='Access Account' />
          </Form>
        </div>
      </Layout>
    </div>
  );
};

export default Login;
