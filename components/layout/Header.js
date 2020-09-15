import React from 'react';
import Link from 'next/link';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import Search from '../ui/Search';
import Navbar from './Navbar';
import Button from '../ui/Button';

const Container = styled.div`
  max-width: 1200px;
  width: 95%;
  margin: 0 auto;
  @media (min-width: 768px) {
    display: flex;
    justify-content: space-between;
  }
`;
const Logo = styled.a`
  color: var(--orange);
  font-size: 4rem;
  line-height: 0;
  font-weight: 700;
  font-family: 'Roboto Slab', serif;
  margin-right: 2rem;
`;

const Header = () => {
  return (
    <header
      css={css`
        border-bottom: 2px solid var(--gris3);
        padding: 1rem 0;
      `}
    >
      <Container>
        <div
          css={css`
            display: flex;
            align-items: center;
          `}
        >
          <Link href='/'>
            <Logo>FF</Logo>
          </Link>
          <Search />
          <Navbar />
        </div>
        <div
          css={css`
            display: flex;
            align-items: center;
          `}
        >
          <>
            <Link href='/login'>
              <Button bgColor='true'>Login</Button>
            </Link>
            <Link href='/create-account'>
              <Button>Create Account</Button>
            </Link>
          </>
        </div>
      </Container>
    </header>
  );
};

export default Header;
