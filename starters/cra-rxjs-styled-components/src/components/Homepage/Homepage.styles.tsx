import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const HeaderContainer = styled.header`
  margin: 20px auto;
  width: 60%;
`;

export const Header = styled.h1`
  color: #fff;
  padding: 1rem;
  font-size: 1.5rem;
  font-weight: 600;
  border: none;
  text-align: center;
  border-radius: 0.25rem;
  background-color: rgb(37 99 235);
`;

export const ButtonLinkDiv = styled.div`
  text-align: center;
  margin: 10px 0;
`;

export const ExampleLink = styled(Link)`
  display: block;
  margin: 10px 0;
  font-size: 1.2rem;
  color: rgb(37 99 235);
  &:hover {
    color: rgb(30 64 175);
    text-decoration: underline;
  }
`;
