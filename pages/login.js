import React from 'react';
import { css } from '@emotion/core';
import Layout from '../components/layout/Layout';

const Login = () => {
  return (
    <div>
      <Layout>
        <h1
          css={css`
            text-align: center;
            margin-top: 5rem;
          `}
        >
          Access Account
        </h1>
      </Layout>
    </div>
  );
};

export default Login;