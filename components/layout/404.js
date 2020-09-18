import React from 'react';
import { css } from '@emotion/core';
import Link from 'next/link';
import Layout from './Layout';

const Error = () => {
  return (
    <Layout>
      <div
        css={css`
          margin-top: 5rem;
          text-align: center;
        `}
      >
        <h1>404: Something went wrong, sorry about that!</h1>
        <Link href='/'>Return to homepage</Link>
      </div>
    </Layout>
  );
};

export default Error;
