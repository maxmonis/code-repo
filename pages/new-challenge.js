import React, { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import FileUploader from 'react-firebase-file-uploader';
import { css } from '@emotion/core';
import Layout from '../components/layout/Layout';
import { Form, Field, Submit, Error } from '../components/ui/Form';
import useValidate from '../hooks/useValidate';
import validateChallenge from '../validation/validateChallenge';
import { FirebaseContext } from '../firebase';

const NewChallenge = () => {
  const { user, firebase } = useContext(FirebaseContext);
  const [error, setError] = useState(null);
  const router = useRouter();
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
    if (!user) return router.push('/login');
    const challenge = {
      name,
      source,
      url,
      description,
      votes: 0,
      comments: [],
      created: Date.now(),
    };
    try {
      firebase.db.collection('challenges').add(challenge);
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
            Upload New Challenge
          </h1>
          <Form onSubmit={handleSubmit}>
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
                  required
                />
              </Field>
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
                  required
                />
              </Field>
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
                  required
                />
              </Field>
              <Field>
                <label htmlFor='solution'>Solution</label>
                <FileUploader
                  accept='image/*'
                  id='solution'
                  name='solution'
                  randomizeFilename
                />
              </Field>
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
                  required
                />
              </Field>
            </fieldset>
            {(Object.keys(errors).length || error) && (
              <Error>
                {errors.name ||
                  errors.source ||
                  errors.url ||
                  errors.description ||
                  error}
              </Error>
            )}
            <Submit type='submit' value='Publish Challenge' />
          </Form>
        </div>
      </Layout>
    </div>
  );
};

export default NewChallenge;
