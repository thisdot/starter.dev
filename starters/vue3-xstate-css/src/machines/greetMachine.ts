import { createMachine, assign } from 'xstate';
import { fetchGreeting } from '@/utils/fetchGreeting';

export const greetMachine = (query: string) => {
  return createMachine(
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
        query,
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
};
