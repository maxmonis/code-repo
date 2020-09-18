import React, { useState } from 'react';
import Router from 'next/router';
import { css } from '@emotion/core';
import Layout from '../components/layout/Layout';
import { Form, Field, Submit, Error } from '../components/ui/Form';
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
          <Form onSubmit={handleSubmit}>
            <fieldset>
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
                  required
                />
              </Field>
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
                  required
                  minLength='6'
                />
              </Field>
              {(Object.keys(errors).length || error) && (
                <Error>{errors.email || errors.password || error}</Error>
              )}
              <Submit type='submit' value='Access Account' />
            </fieldset>
          </Form>
        </div>
      </Layout>
    </div>
  );
};

export default Login;
