import React from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import Link from 'next/link';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

const Container = styled.li`
  padding: 2rem 4rem 1rem;
  border-bottom: 1px solid #e1e1e1;
  text-align: center;
  @media (min-width: 768px) {
    text-align: left;
  }
  @media (min-width: 992px) {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;
const Details = styled.div`
  @media (min-width: 768px) {
    flex: 0 1 900px;
    display: grid;
    grid-template-columns: 1fr 3fr;
    column-gap: 5rem;
  }
`;
const Title = styled.a`
  font-size: 2rem;
  font-weight: bold;
  margin: 0;
  :hover {
    cursor: pointer;
  }
`;
const Text = styled.p`
  font-size: 1.6rem;
  margin: 0;
  color: #888;
  @media (min-width: 576px) {
    text-align: left;
  }
`;
const Feedback = styled.div`
  margin: 2rem auto 1rem;
  display: inline-block;
  justify-content: space-between;
  @media (min-width: 576px) {
    display: flex;
    flex: row;
  }
  @media (min-width: 992px) {
    margin-top: 0;
    display: inline-block;
    padding-left: 3rem;
  }
`;
const Comments = styled.div`
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  div {
    display: flex;
    align-items: center;
    border: 1px solid #e1e1e1;
    padding: 1rem;
    width: 200px;
  }
  img {
    width: 2rem;
    margin-right: 2rem;
  }
  p {
    font-size: 2rem;
    margin-right: 1rem;
    font-weight: 700;
    margin: 0;
  }
`;
const Votes = styled.div`
  text-align: center;
  border: 1px solid #e1e1e1;
  display: flex;
  flex: row;
  margin-bottom: 2rem;
  padding: 1rem 4rem 1rem 1rem;
  font-size: 2rem;
  p {
    margin: 0;
    font-weight: 700;
    margin: 0 2rem 0 1rem;
  }
`;

const Preview = ({ challenge }) => {
  const {
    name,
    source,
    description,
    imgURL,
    numVotes,
    comments,
    published,
    creator,
    id,
  } = challenge;
  return (
    <Container>
      <Details>
        <div
          css={css`
            margin: 0 auto;
            width: 200px;
          `}>
          <img src={imgURL} />
        </div>
        <div>
          <Link href='/challenges/[id]' as={`/challenges/${id}`}>
            <Title>
              {name} ({source})
            </Title>
          </Link>
          <p>
            Published {formatDistanceToNow(new Date(published))} ago by{' '}
            {creator.displayName}
          </p>
          <Text>
            {description.length < 350
              ? description
              : `${description.slice(0, 350).trim()}...`}
          </Text>
        </div>
      </Details>
      <Feedback>
        <Comments>
          <div>
            <img src='/comment.png' />
            <p>
              {comments.length} comment{comments.length !== 1 && 's'}
            </p>
          </div>
        </Comments>
        <Votes>
          <div> &#9650; </div>
          <p>
            {numVotes} upvote{numVotes !== 1 && 's'}
          </p>
        </Votes>
      </Feedback>
    </Container>
  );
};

export default Preview;
