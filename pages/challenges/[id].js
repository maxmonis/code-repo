import React, { useContext, useEffect, useState } from 'react';
import Layout from '../../components/layout/Layout';
import Error from '../../components/layout/404';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { Field, Submit } from '../../components/ui/Form';
import Button from '../../components/ui/Button';
import { useRouter } from 'next/router';
import { FirebaseContext } from '../../firebase';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

const Container = styled.div`
  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: 2fr 1fr;
    column-gap: 2rem;
  }
`;

const Challenge = () => {
  const router = useRouter();
  const {
    query: { id },
  } = router;
  const [challenge, setChallenge] = useState({});
  const [error, setError] = useState(false);
  const { firebase, user } = useContext(FirebaseContext);
  useEffect(() => {
    if (id) {
      const getChallenge = async () => {
        const query = await firebase.db.collection('challenges').doc(id);
        const challenge = await query.get();
        if (challenge.exists) {
          setChallenge(challenge.data());
        } else {
          setError(true);
        }
      };
      getChallenge();
    }
  }, [id]);
  if (!error && !Object.keys(challenge).length) return 'Loading...';
  const {
    name,
    votes,
    url,
    source,
    imgURL,
    code,
    created,
    creator,
  } = challenge;
  return error ? (
    <Error />
  ) : (
    <Layout>
      <>
        <div className='container'>
          <h1
            css={css`
              text-align: center;
              margin-top: 5rem;
            `}
          >
            {name}
          </h1>
          <Container>
            <div>
              <img src={imgURL} />
              <p>{code}</p>
              {user && (
                <>
                  <h2>Add a Comment</h2>
                  <form>
                    <Field>
                      <input type='text' name='message' />
                    </Field>
                    <Submit type='submit' value='Add Comment' />
                  </form>
                </>
              )}
              <h2
                css={css`
                  margin: 2rem 0;
                `}
              >
                Comments
              </h2>
              <ul>
                <li
                  css={css`
                    border: 1px solid #e1e1e1;
                    padding: 2rem;
                  `}
                >
                  <p>
                    Added by{' '}
                    <span
                      css={css`
                        font-weight: bold;
                      `}
                    >
                      {user && user.displayName === creator.name
                        ? 'you'
                        : creator.name}{' '}
                    </span>
                    {formatDistanceToNow(new Date(created))} ago
                  </p>
                </li>
              </ul>
            </div>
            <aside>
              <Button href={url} target='_blank' bgColor='true'>
                View on {source}
              </Button>
              <div
                css={css`
                  margin-top: 5rem;
                `}
              >
                <p
                  css={css`
                    text-align: center;
                  `}
                >
                  {votes} upvotes
                </p>
                {user && <Button>Like</Button>}
              </div>
            </aside>
          </Container>
          {user && user.displayName === creator.name && (
            <Button bgColor='true'>Delete Challenge</Button>
          )}
        </div>
      </>
    </Layout>
  );
};

export default Challenge;
