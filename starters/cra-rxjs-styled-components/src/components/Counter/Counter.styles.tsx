import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const CounterContainer = styled.div`
  width: 60%;
  margin: 10px auto;
`;

export const Header = styled.h1`
  padding: 15px 0;
  font-size: 2rem;
  text-align: center;
  border-bottom: 5px solid rgb(29 78 216);
`;

export const CounterButtonContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

export const CounterButton = styled.button`
  color: #fff;
  padding: 0.5rem 1rem;
  font-size: 1.2rem;
  font-weight: 600;
  border: none;
  border-radius: 0.25rem;
  background-color: rgb(59 130 246);
  cursor: pointer;

  :hover {
    background-color: rgb(29 78 216);
  }
`;

export const CurrentCountText = styled.h2`
  font-size: 1.5rem;
`;

export const HomeLinkDiv = styled.div`
  text-align: center;
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
