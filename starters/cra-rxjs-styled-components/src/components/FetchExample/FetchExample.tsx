import {
  FetchExampleContainer,
  HeaderContainer,
  Header,
  HomeLinkDiv,
  ReturnHomeLink,
  Message,
  Loader,
} from './FetchExample.styles';
import { useState, useEffect } from 'react';
import { fromFetch } from 'rxjs/fetch';

export const FetchExample = () => {
  const [message, setMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const subscription = fromFetch(
      'https://api.starter.dev/.netlify/functions/server/hello?greeting=from This Dot Labs!'
    ).subscribe((response) => response.text().then((data) => setMessage(data)));
    setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => subscription.unsubscribe();
  }, []);

  return (
    <FetchExampleContainer>
      <HeaderContainer>
        <Header>RxJS Fetch Data from API</Header>
      </HeaderContainer>
      <Message>Message: {loading ? <Loader /> : message}</Message>
      <HomeLinkDiv>
        <ReturnHomeLink to="/">Return Home</ReturnHomeLink>
      </HomeLinkDiv>
    </FetchExampleContainer>
  );
};
