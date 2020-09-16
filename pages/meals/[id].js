import React from 'react';
import Layout from '../../components/layout/Layout';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { Field, InputSubmit } from '../../components/ui/Formulario';
import Button from '../../components/ui/Button';

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

const Meal = () => {
  return (
    <Layout>
      <>
        <div className='container'>
          <h1
            css={css`
              text-align: center;
              margin-top: 5rem;
            `}
          >
            Name
          </h1>
          <Container>
            <div>
              <p>Published: a while</p>
              <p>ago by: Someone from Somewhere</p>
              <img />
              <p>Description</p>
              {usuario && (
                <>
                  <h2>Add a Comment</h2>
                  <form>
                    <Field>
                      <input type='text' name='message' />
                    </Field>
                    <InputSubmit type='submit' value='Add Comment' />
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
                )
              </ul>
              )
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
                  Likes go here
                </p>
                <Button>Like</Button>
              </div>
            </aside>
          </Container>
          <Button>Delete Meal</Button>
        </div>
      </>
    </Layout>
  );
};

export default Meal;
