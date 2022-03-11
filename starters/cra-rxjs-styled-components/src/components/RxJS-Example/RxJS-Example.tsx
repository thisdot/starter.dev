import {
  RxJSExampleContainer,
  HomeLinkDiv,
  ReturnHomeLink,
} from './RxJS-Example.styles';
import { useState, useEffect } from 'react';
import { fromFetch } from 'rxjs/fetch';

export const RxJSExample = () => {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const subscription = fromFetch(
      'https://api.starter.dev/hello?greeting=from This Dot Labs!'
    ).subscribe((response) => response.text().then((data) => setMessage(data)));
    setLoading(false);
    return () => subscription.unsubscribe();
  }, []);

  return (
    <RxJSExampleContainer>
      <h1>RxJS Fetch Data from API</h1>
      <p>Message: {loading ? '...Loading message' : message} </p>
      <HomeLinkDiv>
        <ReturnHomeLink to="/">Return Home</ReturnHomeLink>
      </HomeLinkDiv>
    </RxJSExampleContainer>
  );
};
