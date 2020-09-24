import React from 'react';
import { css } from '@emotion/core';

const Footer = () => (
  <div
    css={css`
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 20px;
      text-align: center;
    `}>
    <h4>© Max Monis {new Date().getFullYear()}</h4>
  </div>
);

export default Footer;
