import { createMachine, assign } from 'xstate';

const fetchGreeting = (message: string) => {
  const encodedMessage = encodeURIComponent(message);
  const endpoint = `https://api.starter.dev/.netlify/functions/server/hello?greeting=${encodedMessage}`;
  return fetch(endpoint).then((result) => result.text());
};

export const greetMachine = createMachine(
  {
    id: 'greet',
    predictableActionArguments: true,
    schema: {
      context: {} as { query: string; message: string; error: string },
      services: {} as {
        callFetchMessage: {
          data: { result: string };
        };
      },
    },
    initial: 'loading',
    context: {
      query: 'from This Dot Labs!',
      message: '',
      error: '',
    },
    states: {
      loading: {
        invoke: {
          src: 'callFetchMessage',
          onDone: {
            target: 'complete',
            actions: assign({
              message: (_context, event) => event.data,
            }),
          },
          onError: {
            target: 'failure',
            actions: assign({
              error: (_context, event) => event.data.message,
            }),
          },
        },
      },
      complete: {
        type: 'final',
      },
      failure: {
        type: 'final',
      },
    },
  },
  {
    services: {
      callFetchMessage: (context) => fetchGreeting(context.query),
    },
  }
);
