import {
  RxJSExampleContainer,
  HeaderContainer,
  Header,
  HomeLinkDiv,
  ReturnHomeLink,
  Message,
} from './RxJS-Example.styles';
import { useState, useEffect } from 'react';
import { fromFetch } from 'rxjs/fetch';

export const RxJSExample = () => {
  const [message, setMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const subscription = fromFetch(
      'https://api.starter.dev/hello?greeting=from This Dot Labs!'
    ).subscribe((response) => response.text().then((data) => setMessage(data)));
    setLoading(false);
    return () => subscription.unsubscribe();
  }, []);

  return (
    <RxJSExampleContainer>
      <HeaderContainer>
        <Header>RxJS Fetch Data from API</Header>
      </HeaderContainer>
      <Message>Message: {loading ? '...Loading message' : message}</Message>
      <HomeLinkDiv>
        <ReturnHomeLink to="/">Return Home</ReturnHomeLink>
      </HomeLinkDiv>
    </RxJSExampleContainer>
  );
};
