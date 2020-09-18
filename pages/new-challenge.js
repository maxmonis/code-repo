import React, { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import FileUploader from 'react-firebase-file-uploader';
import { css } from '@emotion/core';
import Layout from '../components/layout/Layout';
import Error404 from '../components/layout/404';
import { Form, Field, Submit, Error } from '../components/ui/Form';
import useValidate from '../hooks/useValidate';
import validateChallenge from '../validation/validateChallenge';
import { FirebaseContext } from '../firebase';

const NewChallenge = () => {
  const { user, firebase } = useContext(FirebaseContext);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [imgName, setImgName] = useState('');
  const [imgURL, setImgURL] = useState('');
  const router = useRouter();
  const INITIAL_STATE = {
    source: '',
    link: '',
    name: '',
    description: '',
    explanation: '',
  };
  const {
    values,
    errors,
    handleChange,
    handleSubmit,
    handleBlur,
  } = useValidate(INITIAL_STATE, validateChallenge, newChallenge);
  const { source, link, name, description, explanation } = values;
  async function newChallenge() {
    if (!user) return router.push('/login');
    const challenge = {
      source,
      link,
      name,
      description,
      imgURL,
      explanation,
      votes: [],
      comments: [],
      published: Date.now(),
      creator: {
        name: user.displayName,
        id: user.uid,
      },
    };
    try {
      firebase.db.collection('challenges').add(challenge);
      return router.push('/');
    } catch ({ message }) {
      console.error('Challenge could not be created', message);
      setError(message);
    }
  }
  const handleUploadStart = () => {
    setProgress(0);
    setLoading(true);
  };
  const handleProgress = (progress) => setProgress({ progress });
  const handleUploadError = (error) => {
    setError(error.message);
    console.error(error);
  };
  const handleUploadSuccess = (name) => {
    setProgress(100);
    setLoading(false);
    setImgName(name);
    firebase.storage
      .ref('challenges')
      .child(imgName)
      .getDownloadURL()
      .then((url) => {
        console.log(url);
        setImgURL(url);
      });
  };
  return !user ? (
    <Error404 />
  ) : (
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
                <label htmlFor='source'>Source</label>
                <input
                  type='text'
                  id='source'
                  placeholder='Name of host website'
                  name='source'
                  value={source}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                />
              </Field>
              <Field>
                <label htmlFor='link'>URL</label>
                <input
                  type='url'
                  id='link'
                  name='link'
                  placeholder='Link to this challenge'
                  value={link}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                />
              </Field>
              <Field>
                <label htmlFor='name'>Name</label>
                <input
                  type='text'
                  id='name'
                  placeholder='Challenge name'
                  name='name'
                  value={name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                />
              </Field>
              <Field>
                <label htmlFor='description'>Description</label>
                <textarea
                  id='description'
                  name='description'
                  value={description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder='Description of the challenge'
                  required
                />
              </Field>
            </fieldset>
            <fieldset>
              <legend>Your Solution</legend>
              <p>Upload a screenshot of your code</p>
              <Field>
                <label htmlFor='screenshot'>Screenshot</label>
                <FileUploader
                  accept='image/*'
                  id='screenshot'
                  name='screenshot'
                  randomizeFilename
                  storageRef={firebase.storage.ref('challenges')}
                  onUploadStart={handleUploadStart}
                  onUploadError={handleUploadError}
                  onUploadSuccess={handleUploadSuccess}
                  onProgress={handleProgress}
                />
              </Field>
              <Field>
                <label htmlFor='explanation'>Explanation</label>
                <textarea
                  id='explanation'
                  name='explanation'
                  value={explanation}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder='Explain your thought process'
                  required
                />
              </Field>
            </fieldset>
            {(Object.keys(errors).length || error) && (
              <Error>
                {errors.source ||
                  errors.link ||
                  errors.name ||
                  errors.description ||
                  errors.explanation ||
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
