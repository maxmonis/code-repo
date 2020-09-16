import React, { useState } from 'react';
import FileUploader from 'react-firebase-file-uploader';
import { css } from '@emotion/core';
import Layout from '../components/layout/Layout';
import { Form, Field, InputSubmit, Error } from '../components/ui/Form';
import useValidate from '../hooks/useValidate';
import validateChallenge from '../validation/validateChallenge';

const NewChallenge = () => {
  const [error, setError] = useState(null);
  const INITIAL_STATE = {
    name: '',
    source: '',
    url: '',
    description: '',
  };
  const {
    values,
    errors,
    handleChange,
    handleSubmit,
    handleBlur,
  } = useValidate(INITIAL_STATE, validateChallenge, newChallenge);
  const { name, source, url, description } = values;
  async function newChallenge() {
    try {
      console.log('newChallenge');
    } catch ({ message }) {
      console.error('Challenge could not be created', message);
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
          <Form onSubmit={handleSubmit} noValidate>
            <fieldset>
              <legend>General Information</legend>
              <Field>
                <label htmlFor='name'>Name</label>
                <input
                  type='text'
                  id='name'
                  placeholder='Challenge Name'
                  name='name'
                  value={name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Field>
              {errors.name && <Error>{errors.name}</Error>}
              <Field>
                <label htmlFor='source'>Source</label>
                <input
                  type='text'
                  id='source'
                  placeholder='Name of Website'
                  name='source'
                  value={source}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Field>
              {errors.source && <Error>{errors.source}</Error>}
              <Field>
                <label htmlFor='url'>URL</label>
                <input
                  type='url'
                  id='url'
                  name='url'
                  placeholder='Link to Website'
                  value={url}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Field>
              {errors.url && <Error>{errors.url}</Error>}
              <Field>
                <label htmlFor='solution'>Solution</label>
                <FileUploader
                  accept='image/*'
                  id='solution'
                  name='solution'
                  randomizeFilename
                />
              </Field>
              {errors.solution && <Error>{errors.solution}</Error>}
            </fieldset>
            <fieldset>
              <legend>About Your Solution</legend>
              <Field>
                <label htmlFor='description'>Description</label>
                <textarea
                  id='description'
                  name='description'
                  value={description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Field>

              {errors.description && <Error>{errors.description}</Error>}
            </fieldset>
            {error && <Error>{error}</Error>}
            <InputSubmit type='submit' value='Publish Challenge' />
          </Form>
        </div>
      </Layout>
    </div>
  );
};

export default NewChallenge;
