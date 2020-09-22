import React from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import Link from 'next/link';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

const Container = styled.li`
  padding: 2rem 4rem 1rem;
  border-bottom: 1px solid #e1e1e1;
  @media (min-width: 768px) {
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
    &:last-of-type {
      margin: 0;
    }
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
  @media (max-width: 768px) {
    font-size: 1rem;
    display: flex;
    flex: row;
    justify-content: space-between;
    margin: 0 0 2rem;
    padding: 1rem 4rem 1rem 2rem;
    div {
      margin-right: 1rem;
    }
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
  console.log(description.length);
  return (
    <Container>
      <Details>
        <div
          css={css`
            width: 75%;
            margin: auto;
            @media (min-width: 768px) {
              width: 200px;
            }
          `}
        >
          <img src={imgURL} />
        </div>
        <div
          css={css`
            padding-right: 3rem;
          `}
        >
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
      <div
        css={css`
          display: flex;
          flex: row;
          justify-content: space-between;
          margin-top: 2rem;
          @media (min-width: 768px) {
            margin-top: 0;
            display: inline-block;
          }
        `}
      >
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
      </div>
    </Container>
  );
};

export default Preview;
