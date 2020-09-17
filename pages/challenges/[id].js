import React, { useContext, useEffect, useState } from 'react';
import Layout from '../../components/layout/Layout';
import Error from '../../components/layout/404';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { Field, Submit } from '../../components/ui/Form';
import Button from '../../components/ui/Button';
import { useRouter } from 'next/router';
import { FirebaseContext } from '../../firebase';

const Container = styled.div`
  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: 2fr 1fr;
    column-gap: 2rem;
  }
`;
const Creator = styled.p`
  padding: 0.5rem 2rem;
  background-color: #da552f;
  color: #fff;
  text-transform: uppercase;
  font-weight: bold;
  display: inline-block;
  text-align: center;
`;

const Challenge = () => {
  const router = useRouter();
  const {
    query: { id },
  } = router;
  const [challenge, setChallenge] = useState({});
  const [error, setError] = useState(false);
  const { firebase } = useContext(FirebaseContext);
  useEffect(() => {
    const getChallenge = async () => {
      try {
        const product = await firebase.db
          .collection('challenges')
          .doc(id)
          .get();
        console.log(product.data());
        setChallenge(product.data());
      } catch (error) {
        setError(true);
      }
    };
    getChallenge();
  }, [id]);
  const { name, votes, imgURL, code } = challenge;
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
              <>
                <h2>Add a Comment</h2>
                <form>
                  <Field>
                    <input type='text' name='message' />
                  </Field>
                  <Submit type='submit' value='Add Comment' />
                </form>
              </>
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
                  <p>Message</p>
                  <p>
                    Written by:
                    <span
                      css={css`
                        font-weight: bold;
                      `}
                    >
                      Name
                    </span>
                  </p>
                  <Creator>You are creator</Creator>
                </li>
              </ul>
            </div>
            <aside>
              <Button target='_blank' bgColor='true'>
                Visit Website
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
                <Button>Like</Button>
              </div>
            </aside>
          </Container>
          <Button>Delete Challenge</Button>
        </div>
      </>
    </Layout>
  );
};

export default Challenge;
