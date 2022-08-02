import React, { useMemo } from 'react';
import { of, mergeMap } from 'rxjs';
import { $ } from 'react-rxjs-elements';
import { map, catchError, startWith } from 'rxjs/operators';

import {
  FetchExampleContainer,
  HeaderContainer,
  Header,
  HomeLinkDiv,
  ReturnHomeLink,
  Message,
  Loader,
} from './FetchExample.styles';
import { fromFetch } from 'rxjs/fetch';


export const FetchExample = () => {
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

  return <$>{stream$}</$>;
};
