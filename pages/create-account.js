import React from 'react';
import { css } from '@emotion/core';

const CreateAccount = () => {
  return (
    <div>
      <h1
        css={css`
          text-align: center;
          margin-top: 5rem;
        `}
      >
        Create New Account
      </h1>
    </div>
  );
};

export default CreateAccount;
