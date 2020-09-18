import React, { useContext } from 'react';
import Link from 'next/link';
import styled from '@emotion/styled';
import { FirebaseContext } from '../../firebase';

const Nav = styled.nav`
  padding-left: 2rem;
  a {
    font-size: 1.8rem;
    margin-left: 2rem;
    color: var(--grey2);
    font-family: 'PT Sans', sans-serif;
    &:last-of-type {
      margin-right: 0;
    }
  }
`;
const Navbar = () => {
  const { user } = useContext(FirebaseContext);
  return (
    <Nav>
      <Link href='/popular'>
        <a>Popular</a>
      </Link>
      {user && (
        <Link href='/new-challenge'>
          <a>New</a>
        </Link>
      )}
    </Nav>
  );
};

export default Navbar;
