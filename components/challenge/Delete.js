import React, { useState } from 'react';
import { css } from '@emotion/core';
import Button from '../ui/Button';
import { Field } from '..//ui/Form';

const Delete = ({ name, handleDelete }) => {
  const [displayForm, setDisplayForm] = useState(false);
  const toggle = () => setDisplayForm(!displayForm);
  const [value, setValue] = useState('');
  const handleChange = e => setValue(e.target.value);
  const namesMatch = () =>
    value.toLowerCase().replace(/ /g, '') ===
    name.toLowerCase().replace(/ /g, '');
  return (
    <div
      css={css`
        width: 75%;
        margin: 0 auto;
      `}>
      {displayForm ? (
        <div
          css={css`
            text-align: center;
            border: 2px solid #e1e1e1;
            padding: 1rem;
          `}>
          <h3>Permanently delete {name}?</h3>
          <Field>
            <input
              type='text'
              placeholder='Confirm name of challenge to be deleted'
              value={value}
              onChange={handleChange}
            />
          </Field>
          <Button onClick={toggle} bgColor='true'>
            Cancel
          </Button>
          {namesMatch() && (
            <Button onClick={handleDelete}>
              I understand the consequences, delete {name}
            </Button>
          )}
        </div>
      ) : (
        <Button onClick={toggle}>Delete Challenge</Button>
      )}
    </div>
  );
};

export default Delete;
