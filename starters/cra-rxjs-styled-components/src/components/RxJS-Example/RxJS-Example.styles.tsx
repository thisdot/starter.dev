import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const RxJSExampleContainer = styled.div`
  text-align: center;
`;

export const HeaderContainer = styled.header`
  margin: 20px auto;
  width: 40%;
`;

export const Header = styled.h1`
  padding: 15px 0;
  font-size: 2rem;
  text-align: center;
  border-bottom: 5px solid rgb(29 78 216);
`;

export const Message = styled.p`
  font-size: 1.2rem;
`;

export const HomeLinkDiv = styled.div`
  margin: 10px 0;
`;

export const ReturnHomeLink = styled(Link)`
  font-size: 1.2rem;
  color: rgb(37 99 235);
  &:hover {
    color: rgb(30 64 175);
    text-decoration: underline;
  }
`;
