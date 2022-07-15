import React, { useState, useEffect, useMemo } from 'react';
import { BehaviorSubject, of, merge, mergeMap } from 'rxjs';
import { $ } from 'react-rxjs-elements';
import {
  debounceTime,
  map,
  distinctUntilChanged,
  filter,
  switchMap,
  catchError,
  startWith,
} from 'rxjs/operators';

import {
  FetchExampleContainer,
  HeaderContainer,
  Header,
  HomeLinkDiv,
  ReturnHomeLink,
  Message,
  LoaderContainer,
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
        startWith(
          <LoaderContainer>
            <span
              style={{
                display: 'block',
                background: 'lightgray',
                width: '20em',
                height: '2em',
                textAlign: 'center',
                margin: 'auto',
                borderRadius: '10px',
                justifyContent: 'center',
              }}
            ></span>
          </LoaderContainer>
        )
      ),
    []
  );

  return <$>{stream$}</$>;
};
