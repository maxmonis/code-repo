import React from 'react';
import { css } from '@emotion/core';
import Layout from '../components/layout/Layout';

const CreateAccount = () => {
  return (
    <div>
      <Layout>
        <div className='container'>
          <h1
            css={css`
              text-align: center;
              margin-top: 5rem;
            `}
          >
            Create New Account
          </h1>
        </div>
      </Layout>
    </div>
  );
};

export default CreateAccount;
