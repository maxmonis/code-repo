import React from 'react';
import Link from 'next/link';
import styled from '@emotion/styled';

const Nav = styled.nav`
  a {
    font-size: 1.8rem;
    margin-right: 1rem;
    color: var(--grey2);
    font-family: 'PT Sans', sans-serif;
  }
`;
const Navbar = ({ user }) => {
  return (
    <Nav>
      <Link href='/popular'>
        <a>Popular</a>
      </Link>
      {user && (
        <Link href='/new-challenge'>
          <a>Create</a>
        </Link>
      )}
    </Nav>
  );
};

export default Navbar;
