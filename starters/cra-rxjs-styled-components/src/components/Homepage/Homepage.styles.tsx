import styled from 'styled-components';
import { Link } from 'react-router-dom';
export const Header = styled.header`
  color: #fff;
  padding: 1rem;
  font-size: 2rem;
  font-weight: 600;
  border: none;
  margin: 20px auto;
  text-align: center;
  width: 50%;
  height: ;
  border-radius: 0.25rem;
  background-color: rgb(59 130 246);
`;

export const ButtonExampleLink = styled(Link)`
  &:hover {
    text-decoration: underline;
  }
`;
