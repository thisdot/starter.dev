import styled from 'styled-components';
import { Link } from 'react-router-dom';
export const RxJSExampleContainer = styled.div`
  text-align: center;
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
