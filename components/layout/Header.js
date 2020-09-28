import React, { useEffect, useState, useContext } from 'react';
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
const Icon = styled.button`
  height: 3rem;
  width: 3rem;
  display: block;
  background-size: 4rem;
  background-image: url('/search.png');
  background-repeat: no-repeat;
  background-color: white;
  border: none;
  text-indent: -9999px;
  &:hover {
    cursor: pointer;
  }
`;
const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Header = () => {
  const { user, firebase } = useContext(FirebaseContext);
  const handleLogout = () => {
    firebase.logout();
  };
  const [mobile, setMobile] = useState(
    typeof window !== 'undefined' && window.innerWidth < 420
  );
  const updateMedia = () => {
    setMobile(window.innerWidth < 420);
  };
  useEffect(() => {
    window.addEventListener('resize', updateMedia);
    return () => window.removeEventListener('resize', updateMedia);
  });
  const [showSearch, setShowSearch] = useState(false);
  return (
    <header
      css={css`
        border-bottom: 2px solid var(--grey3);
        padding: 1rem 0;
      `}>
      <Container>
        <Content>
          {mobile && showSearch ? (
            <>
              <Link href='/'>
                <Logo>CR</Logo>
              </Link>
              <Search />
            </>
          ) : mobile ? (
            <>
              <Link href='/'>
                <Logo>CodeRepo</Logo>
              </Link>
              <Icon onClick={() => setShowSearch(true)} />
            </>
          ) : (
            <>
              <Link href='/'>
                <Logo>CodeRepo</Logo>
              </Link>{' '}
              <Search />
            </>
          )}
        </Content>
        <Content>
          <Navbar user={user} />
          {user ? (
            <div>
              <Button onClick={handleLogout} bgColor='true'>
                Logout
              </Button>
            </div>
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
                <Button>Signup</Button>
              </Link>
            </div>
          )}
        </Content>
      </Container>
    </header>
  );
};

export default Header;
