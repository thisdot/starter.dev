import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const HeaderContainer = styled.div`
  margin: 20px auto;
  width: 60%;
`;

export const Header = styled.header`
  color: #fff;
  padding: 1rem;
  font-size: 1.5rem;
  font-weight: 600;
  border: none;
  text-align: center;

  border-radius: 0.25rem;
  background-color: rgb(59 130 246);
`;

export const ButtonLinkDiv = styled.div`
  text-align: center;
  margin: 10px 0;
`;

export const ButtonExampleLink = styled(Link)`
  font-size: 1.2rem;
  color: rgb(37 99 235);
  &:hover {
    color: rgb(30 64 175);
    text-decoration: underline;
  }
`;
