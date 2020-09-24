import React, { useState } from 'react';
import Router from 'next/router';
import styled from '@emotion/styled';
import { css } from '@emotion/core';

const Text = styled.input`
  border: 1px solid var(--grey3);
  padding: 1rem;
  min-width: 250px;
`;
const Submit = styled.button`
  height: 3rem;
  width: 3rem;
  display: block;
  background-size: 4rem;
  background-image: url('/search.png');
  background-repeat: no-repeat;
  position: absolute;
  right: 1rem;
  top: 1px;
  background-color: white;
  border: none;
  text-indent: -9999px;
  &:hover {
    cursor: pointer;
  }
`;

const Search = () => {
  const [search, setSearch] = useState('');
  const handleChange = (e) => setSearch(e.target.value);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search.trim()) return;
    Router.push({ pathname: '/search', query: { q: search } });
  };
  return (
    <form
      css={css`
        position: relative;
      `}
      onSubmit={handleSubmit}
    >
      <Text type='text' placeholder='Search...' onChange={handleChange} />
      <Submit type='submit'>Search</Submit>
    </form>
  );
};

export default Search;
