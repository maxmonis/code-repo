import React, { useContext, useEffect, useState } from 'react';
import Layout from '../../components/layout/Layout';
import Error from '../../components/layout/404';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import Button from '../../components/ui/Button';
import Comments from '../../components/challenge/Comments';
import Delete from '../../components/challenge/Delete';
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
const Votes = styled.div`
  flex: 0 0 auto;
  text-align: center;
  border: 1px solid #e1e1e1;
  padding: 1rem 3rem;
  div {
    font-size: 2rem;
  }
  p {
    margin: 0;
    font-size: 2rem;
    font-weight: 700;
  }
`;

const Challenge = () => {
  const { firebase, user } = useContext(FirebaseContext);
  const [challenge, setChallenge] = useState({});
  const [error, setError] = useState(false);
  const [referenceDB, setReferenceDB] = useState(true);
  const router = useRouter();
  const {
    query: { id },
  } = router;
  useEffect(() => {
    if (id && referenceDB) {
      const getChallenge = async () => {
        const query = await firebase.db.collection('challenges').doc(id);
        const challenge = await query.get();
        if (challenge.exists) {
          setChallenge(challenge.data());
          setReferenceDB(false);
        } else {
          setError(true);
          setReferenceDB(false);
        }
      };
      getChallenge();
    }
  }, [id]);
  if (!error && !Object.keys(challenge).length) return 'Loading...';
  const {
    name,
    description,
    votes,
    numVotes,
    link,
    source,
    imgURL,
    imgName,
    comments,
    explanation,
    published,
    creator,
  } = challenge;
  const isCreator = () => user && user.uid === creator.uid;
  const handleVote = () => {
    if (!user) return router.push('/login');
    const { uid } = user;
    if (votes.includes(uid)) return;
    const newNum = numVotes + 1;
    const updatedVotes = [...votes, uid];
    firebase.db
      .collection('challenges')
      .doc(id)
      .update({ votes: updatedVotes, numVotes: newNum });
    setChallenge({ ...challenge, votes: updatedVotes, numVotes: newNum });
    setReferenceDB(true);
  };
  const addComment = comment => {
    if (!comment) return;
    const updatedComments = [...comments, comment];
    firebase.db
      .collection('challenges')
      .doc(id)
      .update({ comments: updatedComments });
    setChallenge({ ...challenge, comments: updatedComments });
    setReferenceDB(true);
  };
  const handleDelete = async () => {
    try {
      await firebase.db.collection('challenges').doc(id).delete();
      await firebase.storage.ref('challenges').child(imgName).delete();
      router.push('/');
    } catch (error) {
      console.log(error);
    }
  };
  return error ? (
    <Error />
  ) : (
    <Layout>
      <div className='container'>
        <h1
          css={css`
            text-align: center;
            margin-top: 5rem;
          `}>
          {name}
        </h1>
        <p>
          Added by{' '}
          <span
            css={css`
              font-weight: bold;
            `}>
            {isCreator() ? 'you' : creator.displayName}{' '}
          </span>
          {formatDistanceToNow(new Date(published))} ago
        </p>
        <Container>
          <div>
            <h2>Description</h2>
            <p>{description}</p>
            <h2>Code</h2>
            <img src={imgURL} />
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
              `}>
              <Votes>
                <div> &#9650; </div>
                <p>
                  {numVotes} upvote{numVotes !== 1 && 's'}
                </p>
              </Votes>
              {user && !votes.includes(user.uid) && (
                <Button onClick={handleVote} bgColor='true'>
                  Upvote
                </Button>
              )}
            </div>
          </aside>
        </Container>
        <Comments
          user={user}
          comments={comments}
          creator={creator}
          addComment={addComment}
        />
      </div>
      {isCreator() && <Delete name={name} handleDelete={handleDelete} />}
    </Layout>
  );
};

export default Challenge;
