import React from 'react';
import { css } from '@emotion/core';
import Link from 'next/link';

const Error = () => {
  return (
    <div className='container'>
      <h1
        css={css`
          margin-top: 5rem;
          text-align: center;
        `}
      >
        404: Something went wrong, sorry about that!
      </h1>
      <Link href='/'>Return to homepage</Link>
    </div>
  );
};

export default Error;
