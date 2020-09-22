import React from 'react';
import { css } from '@emotion/core';

const Footer = () => (
  <div
    css={css`
      text-align: center;
    `}
  >
    <h6>© Max Monis {new Date().getFullYear()}</h6>
  </div>
);

export default Footer;
