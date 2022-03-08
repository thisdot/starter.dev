import styled from 'styled-components';

export const CounterButton = styled.button`
  color: #fff;
  padding: 0.5rem 1rem;
  font-weight: 700;
  border-radius: 0.25rem;
  --bg-opacity: 1;
  background-color: rgba(66, 153, 225, var(--bg-opacity));
  cursor: pointer;

  :hover {
    background-color: rgb(29 78 216);
  }
`;
