import {
  RxJSExampleContainer,
  HomeLinkDiv,
  ReturnHomeLink,
} from './RxJS-Example.styles';
import { useState, useEffect } from 'react';
import { fromFetch } from 'rxjs/fetch';

export const RxJSExample = () => {
  const [data, setData] = useState('');

  useEffect(() => {
    const subscription = fromFetch(
      'https://api.starter.dev/hello?greeting=jess'
    ).subscribe((response) => response.text().then((data) => setData(data)));

    return () => subscription.unsubscribe();
  }, []);

  return (
    <RxJSExampleContainer>
      <h1>RxJS Fetch Data from API</h1>
      <p>Message: {data}</p>
      <HomeLinkDiv>
        <ReturnHomeLink to="/">Return Home</ReturnHomeLink>
      </HomeLinkDiv>
    </RxJSExampleContainer>
  );
};
