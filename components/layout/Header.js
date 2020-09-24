import React, { useContext } from 'react';
import Router from 'next/router';
import Link from 'next/link';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import Search from '../ui/Search';
import Navbar from './Navbar';
import Button from '../ui/Button';
import { FirebaseContext } from '../../firebase';

const Container = styled.div`
  max-width: 1200px;
  width: 95%;
  margin: 1rem auto 0;
  display: grid;
  justify-content: center;
  text-align: center;
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
  cursor: pointer;
`;
const Content = styled.div`
  display: inline-block;
  align-items: space-between;
  @media (min-width: 400px) {
    display: flex;
    align-items: center;
  }
`;

const Header = () => {
  const { user, firebase } = useContext(FirebaseContext);
  const handleLogout = () => {
    Router.push('/login');
    firebase.logout();
  };
  return (
    <header
      css={css`
        border-bottom: 2px solid var(--grey3);
        padding: 1rem 0;
      `}>
      <Container>
        <Content>
          <Link href='/'>
            <Logo>CR</Logo>
          </Link>
          <Search />
        </Content>
        <Content>
          <Navbar user={user} />
          {user ? (
            <Button onClick={handleLogout} bgColor='true'>
              Log {user.displayName} Out
            </Button>
          ) : (
            <div
              css={css`
                display: flex;
                flex: row;
              `}>
              <Link href='/login'>
                <Button bgColor='true'>Login</Button>
              </Link>
              <Link href='/create-account'>
                <Button>Create Account</Button>
              </Link>
            </div>
          )}
        </Content>
      </Container>
    </header>
  );
};

export default Header;
