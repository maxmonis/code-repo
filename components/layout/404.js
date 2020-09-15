import React from 'react';
import { css } from '@emotion/core';

const Error = () => {
  return (
    <h1
      css={css`
        margin-top: 5rem;
        text-align: center;
      `}
    >
      404: Something went wrong, sorry about that!
    </h1>
  );
};

export default Error;
