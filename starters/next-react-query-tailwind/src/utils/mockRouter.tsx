/* eslint-disable react/display-name */
import type { ReactElement } from 'react';
import type { NextRouter } from 'next/router';
import { RouterContext } from 'next/dist/shared/lib/router-context';

const createMockRouter = (router: Partial<NextRouter> = {}) => {
  const mockRouter: NextRouter = {
    basePath: '',
    pathname: '/',
    route: '/',
    asPath: '/',
    query: {},
    push: jest.fn(),
    replace: jest.fn(),
    reload: jest.fn(),
    back: jest.fn(),
    prefetch: jest.fn(),
    beforePopState: jest.fn(),
    events: {
      on: jest.fn(),
      off: jest.fn(),
      emit: jest.fn(),
    },
    isFallback: false,
    isLocaleDomain: false,
    isReady: true,
    isPreview: false,
    forward: jest.fn(),
  };
  return { ...mockRouter, ...router };
};

export const createRouterProvider = (router: Partial<NextRouter> = {}) => {
  return ({ children }: { children: ReactElement }) => (
    <RouterContext.Provider value={createMockRouter(router)}>
      {children}
    </RouterContext.Provider>
  );
};
