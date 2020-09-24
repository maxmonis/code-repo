import styled from '@emotion/styled';

export const Form = styled.form`
  width: 95%;
  margin: 2rem auto 0 auto;
  fieldset {
    max-width: 600px;
    margin: 2rem auto;
    border: 1px solid #e1e1e1;
    font-size: 2rem;
    padding: 2rem;
  }
`;

export const Field = styled.div`
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  max-width: 95%;
  label:not(.btn) {
    font-size: 1.8rem;
    flex: 0 0 100px;
    @media (max-width: 576px) {
      flex: 0;
    }
  }
  input,
  textarea {
    padding: 1rem;
    flex: 1;
  }
  textarea {
    height: 200px;
  }
  @media (max-width: 576px) {
    flex-direction: column;
  }
`;

export const Submit = styled.input`
  background-color: var(--orange);
  width: 100%;
  padding: 1.5rem;
  text-align: center;
  color: #fff;
  font-size: 1.8rem;
  text-transform: uppercase;
  border: none;
  font-family: 'PT Sans', sans-serif;
  font-weight: 700;
  &:hover {
    cursor: pointer;
  }
`;

export const Error = styled.p`
  background-color: red;
  padding: 1rem;
  font-family: 'PT Sans', sans-serif;
  font-weight: 700;
  font-size: 1.4rem;
  color: #fff;
  text-align: center;
  text-transform: uppercase;
  margin: 2rem 0;
`;
