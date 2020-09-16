import React from 'react';
import { css } from '@emotion/core';
import Layout from '../components/layout/Layout';
import { Form, Field, InputSubmit, Error } from '../components/ui/Form';
import useValidate from '../hooks/useValidate';
import validateCreateAccount from '../validation/validateCreateAccount';

const CreateAccount = () => {
  const INITIAL_STATE = {
    name: '',
    email: '',
    password: '',
  };
  const {
    values,
    errors,
    submit,
    handleChange,
    handleSubmit,
    handleBlur,
  } = useValidate(INITIAL_STATE, validateCreateAccount, createAccount);
  const { name, email, password } = values;
  function createAccount() {
    console.log(values);
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
          <Form onSubmit={handleSubmit} noValidate>
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
              />
            </Field>
            {errors.name && <Error>{errors.name}</Error>}
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
            <InputSubmit type='submit' value='Create Account' />
          </Form>
        </div>
      </Layout>
    </div>
  );
};

export default CreateAccount;
