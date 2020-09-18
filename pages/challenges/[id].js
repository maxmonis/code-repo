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
  const { firebase, user } = useContext(FirebaseContext);
  const [challenge, setChallenge] = useState({});
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);
  const router = useRouter();
  const {
    query: { id },
  } = router;
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
    link,
    source,
    imgURL,
    comments,
    explanation,
    published,
    creator,
  } = challenge;
  const handleVote = () => {
    if (!user) return router.push('/login');
    const { uid } = user;
    if (votes.includes(uid)) return;
    const updatedVotes = [...votes, uid];
    firebase.db
      .collection('challenges')
      .doc(id)
      .update({ votes: updatedVotes });
    setChallenge({ ...challenge, votes: updatedVotes });
  };
  const handleChange = (e) => setMessage(e.target.value);
  const handleSubmit = (e) => {
    e.preventDefault();
    const { uid, displayName } = user;
    const updatedComments = [...comments, { message, uid, displayName }];
    firebase.db
      .collection('challenges')
      .doc(id)
      .update({ comments: updatedComments });
    setChallenge({ ...challenge, comments: updatedComments });
    setMessage('');
  };
  const handleDelete = async () => {
    if (!user) return router.push('/login');
    if (creator.id !== user.uid) return router.push('/');
    try {
      await firebase.db.collection('challenges').doc(id).delete();
      router.push('/');
    } catch (error) {
      console.log(error);
    }
  };
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
          <p>
            Added by{' '}
            <span
              css={css`
                font-weight: bold;
              `}
            >
              {user && user.displayName === creator.name ? 'you' : creator.name}{' '}
            </span>
            {formatDistanceToNow(new Date(published))} ago
          </p>
          <Container>
            <div>
              <h2>Code</h2>
              <img src={imgURL} />
              {user && (
                <>
                  <h2>Add a Comment</h2>
                  <form onSubmit={handleSubmit}>
                    <Field>
                      <input
                        type='text'
                        value={message}
                        onChange={handleChange}
                      />
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
              {comments.length ? (
                <ul>
                  {comments.map((comment, i) => (
                    <li
                      key={comment.uid - i}
                      css={css`
                        border: 1px solid #e1e1e1;
                        padding: 2rem;
                      `}
                    >
                      <p>{comment.message}</p>
                      <p>
                        Written by{' '}
                        <span
                          css={css`
                            font-weight: bold;
                          `}
                        >
                          {user && user.displayName === comment.displayName
                            ? 'you'
                            : comment.displayName}
                          {comment.displayName === creator.name &&
                            ' (creator of this post)'}
                        </span>
                      </p>
                    </li>
                  ))}
                </ul>
              ) : (
                <h4>No comments yet...seems a good time to add one</h4>
              )}
            </div>
            <aside>
              <h2>Explanation</h2>
              <p>{explanation}</p>
              <Button href={link} target='_blank' bgColor='true'>
                View on {source}
              </Button>
              <div
                css={css`
                  margin-top: 5rem;
                `}
              >
                <h3
                  css={css`
                    text-align: center;
                  `}
                >
                  {votes.length} upvote{votes.length !== 1 && 's'}
                </h3>
                {user && !votes.includes(user.uid) && (
                  <Button onClick={handleVote} bgColor='true'>
                    Upvote
                  </Button>
                )}
              </div>
              {user && user.displayName === creator.name && (
                <Button onClick={handleDelete} bgColor='true'>
                  Delete Challenge
                </Button>
              )}
            </aside>
          </Container>
        </div>
      </>
    </Layout>
  );
};

export default Challenge;
