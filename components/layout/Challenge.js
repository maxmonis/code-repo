import React from 'react';
import styled from '@emotion/styled';
import Link from 'next/link';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

const Container = styled.li`
  padding: 4rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e1e1e1;
`;
const Details = styled.div`
  flex: 0 1 600px;
  display: grid;
  grid-template-columns: 1fr 3fr;
  column-gap: 2rem;
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
  margin-top: 2rem;
  display: flex;
  align-items: center;
  div {
    display: flex;
    align-items: center;
    border: 1px solid #e1e1e1;
    padding: 0.3rem 1rem;
    margin-right: 2rem;
  }
  img {
    width: 2rem;
    margin-right: 2rem;
  }
  p {
    font-size: 1.6rem;
    margin-right: 1rem;
    font-weight: 700;
    &:last-of-type {
      margin: 0;
    }
  }
`;
const Image = styled.img`
  width: 200px;
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

const Challenge = ({ challenge }) => {
  const {
    name,
    description,
    code,
    imgURL,
    votes,
    comments,
    created,
    id,
  } = challenge;
  return (
    <Container>
      <Details>
        <div>
          <Image src={imgURL} />
        </div>
        <div>
          <Link href='/challenges/[id]' as={`/challenges/${id}`}>
            <Title>{name}</Title>
          </Link>
          <Text>{description}</Text>
          <Title>Solution</Title>
          <Text>{code}</Text>
          <Comments>
            <div>
              <img src='/static/img/comment.png' />
              <p>{comments.length} comments</p>
            </div>
          </Comments>
          <p>Published {formatDistanceToNow(new Date(created))} ago</p>
        </div>
      </Details>
      <Votes>
        <div> &#9650; </div>
        <p>{votes} upvotes</p>
      </Votes>
    </Container>
  );
};

export default Challenge;
