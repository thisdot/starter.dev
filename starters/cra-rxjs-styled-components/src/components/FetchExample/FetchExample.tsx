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
  const stream$ = useMemo(
    () =>
      fromFetch(
        'https://api.starter.dev/hello?greeting=from This Dot Labs!'
      ).pipe(
        mergeMap((response) => response.text()),
        // now we'll map not only to text
        // but to JSX
        map((data) => (
          <FetchExampleContainer>
            <HeaderContainer>
              <Header>RxJS Fetch Data from API</Header>
            </HeaderContainer>
            <Message>Message: {data}</Message>
            <HomeLinkDiv>
              <ReturnHomeLink to="/">Return Home</ReturnHomeLink>
            </HomeLinkDiv>
          </FetchExampleContainer>
        )),
        catchError(() => of(<div className="err">ERROR</div>)),
        startWith(<Loader />)
      ),
    []
  );

  return <$>{stream$}</$>;
};
