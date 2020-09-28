import React, { useState } from 'react';
import { css } from '@emotion/core';
import { Field, Submit } from '../ui/Form';

const Comments = ({ user, comments, creator, addComment }) => {
  const [message, setMessage] = useState('');
  const handleChange = e => setMessage(e.target.value);
  const handleSubmit = e => {
    e.preventDefault();
    if (!message) return;
    const { uid, displayName } = user;
    addComment({ message, uid, displayName });
    setMessage('');
  };
  return (
    <div>
      {user && (
        <>
          <h2>Add a Comment</h2>
          <form onSubmit={handleSubmit}>
            <Field>
              <input
                type='text'
                value={message}
                onChange={handleChange}
                placeholder={`Let ${creator.displayName} know what you think of this solution`}
              />
            </Field>
            {message && <Submit type='submit' value='Add Comment' />}
          </form>
        </>
      )}
      <h2
        css={css`
          margin: 2rem 0;
        `}>
        Comments
      </h2>
      {comments.length ? (
        <ul>
          {comments.map((comment, i) => (
            <li
              key={`${comment.uid} - ${i}`}
              css={css`
                border: 1px solid #e1e1e1;
                padding: 2rem;
              `}>
              <p>{comment.message}</p>
              <p>
                Written by{' '}
                <span
                  css={css`
                    font-weight: bold;
                  `}>
                  {user && user.uid === comment.uid
                    ? 'you'
                    : comment.displayName}
                  {comment.uid === creator.uid && ' (creator of this post)'}
                </span>
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <h4>No comments yet...seems a good time to add one</h4>
      )}
    </div>
  );
};

export default Comments;
