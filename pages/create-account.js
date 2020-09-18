import React, { useState } from 'react';
import Router from 'next/router';
import { css } from '@emotion/core';
import Layout from '../components/layout/Layout';
import { Form, Field, Submit, Error } from '../components/ui/Form';
import useValidate from '../hooks/useValidate';
import validateAccount from '../validation/validateAccount';
import firebase from '../firebase';

const CreateAccount = () => {
  const [error, setError] = useState(null);
  const INITIAL_STATE = {
    name: '',
    email: '',
    password: '',
  };
  const {
    values,
    errors,
    handleChange,
    handleSubmit,
    handleBlur,
  } = useValidate(INITIAL_STATE, validateAccount, createAccount);
  const { name, email, password } = values;
  async function createAccount() {
    try {
      await firebase.register(name, email, password);
      Router.push('/');
    } catch ({ message }) {
      console.error('Account could not be created', message);
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
            Create New Account
          </h1>
          <Form onSubmit={handleSubmit}>
            <fieldset>
              <Field>
                <label htmlFor='name'>Name</label>
                <input
                  type='text'
                  id='name'
                  placeholder='Your Name'
                  name='name'
                  value={name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                />
              </Field>
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
                <Error>
                  {errors.name || errors.email || errors.password || error}
                </Error>
              )}
              <Submit type='submit' value='Create Account' />
            </fieldset>
          </Form>
        </div>
      </Layout>
    </div>
  );
};

export default CreateAccount;
